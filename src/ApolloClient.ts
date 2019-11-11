import { ApolloClient, DefaultOptions, ApolloError } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { GraphQLError, OperationDefinitionNode } from "graphql";
import { getMainDefinition } from "apollo-utilities";
import { parse, stringify } from "flatted";

import { typeDefs, resolvers } from "./queries/resolvers";
import { SubscriptionClient } from "subscriptions-transport-ws";

/**
 * Here you can define default options that are applied to all queries, mutations.
 * Note: We currently disable "cached" queries to avoid race-cond, bugs...
 */
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  },
  mutate: {
    errorPolicy: "all"
  }
};

// Setup the cache
const cache = new InMemoryCache({});

/**
 * This is a "fake" async call. This resolves however the case, that the IdToken is briefly undefined!
 * TODO(df): Maybe it would be better, if the client is setup only in the private app?
 */
async function getAsyncConnectionParams() {
  const { idToken, currentRole } = window.VoCHabularAdminFrontend;
  return {
    headers: {
      Authorization: `Bearer ${idToken}`,
      "X-Hasura-Role": currentRole // TODO(df): need to be able to "overwrite" this via context: https://www.apollographql.com/docs/link/overview/
    }
  };
}

/**
 * Handles GraphQL error. Note that you can not use async/await... https://github.com/apollographql/apollo-link/issues/646#issuecomment-423279220
 * @param {} graphQLErrors
 */
function handleGraphQLError(graphQLErrors: ApolloError["graphQLErrors"]) {
  graphQLErrors.map(({ message, locations, path }: GraphQLError) => {
    return console.error(
      `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
        locations
      )}, Path: ${path}`
    );
  });
}

/**
 * Handles Network errors such as token expired, invalid etc...
 * @param {} networkError
 */
function handleNetworkError(networkError: ApolloError["networkError"]) {
  // TODO: Wrong types, altough available:
  // See here https://github.com/apollographql/apollo-link/issues/300
  // @ts-ignore
  const { statusCode, result } = networkError;
  if (statusCode === 400) {
    // Handle case when token has expired...
    if (
      result &&
      result.errors &&
      result.errors[0] &&
      result.errors[0].message === "Could not verify JWT: JWTExpired"
    ) {
      console.info("ID Token has expired! Attempting to refresh...");
      try {
        // TODO: REFRESH TOKEN AND TRY AGAIN...
        // auth0Client.renewSession().then(() => console.log("Session renwed!"));
      } catch (e) {
        throw new Error(e);
      }
    } else {
      console.error(networkError);
      console.error(JSON.stringify(networkError));
    }
  } else {
    console.error(`General network error: ${JSON.stringify(networkError)}`);
  }
}

// On each request, set the current idToken in the header
// TODO(df): need to improve this with caching etc:
// https://www.apollographql.com/docs/link/overview/
// https://www.apollographql.com/docs/link/links/context/
// https://spectrum.chat/apollo/general/how-to-pass-additional-header-when-calling-query~67b83ba9-a1b8-4cfd-baca-5d792b2a9836
const request = async (operation: any) => {
  const params = await getAsyncConnectionParams();
  operation.setContext(params);
};

/**
 * react-apollo uses "__typename" for a normalized flat cache. We have to strip this however on mutations before sending to Hasura, as otherwise it complains of an unknown property
 */
const cleanTypenameLink = new ApolloLink((operation, forward) => {
  const omitTypename = (key: any, value: any) =>
    key === "__typename" ? undefined : value;

  const def = getMainDefinition(operation.query);
  if (def && (<OperationDefinitionNode>def).operation === "mutation") {
    operation.variables = parse(stringify(operation.variables), omitTypename);
  }
  return forward ? forward(operation) : null;
});

// Here we can chain
const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          if (!forward) return null;
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

// Create an http link:
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_BACKEND_URL
});

const wssUrl =
  (process.env.REACT_APP_BACKEND_URL &&
    process.env.REACT_APP_BACKEND_URL.replace("https://", "wss://")) ||
  "";

// Create a WebSocket link:
const wsLink = new WebSocketLink(
  new SubscriptionClient(wssUrl, {
    connectionParams: async () => getAsyncConnectionParams(),
    lazy: true,
    reconnect: true,
    timeout: 30000
  })
);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }: any) => {
    // @ts-ignore
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  defaultOptions,
  cache,
  link: ApolloLink.from([
    /**
     * Clean the __typename from all mutations
     */
    cleanTypenameLink,
    /**
     * TODO(df): Central error handling. For example, on mutation error, we should show a "error" notification. When no network, we should alert the user...
     *
     */
    onError(e => {
      if (e.graphQLErrors) {
        // TODO: We should send something to sentry...
        // sendToLoggingService(graphQLErrors);
        handleGraphQLError(e.graphQLErrors);
      }
      if (e.networkError) {
        // TODO: We should logout the user, if the network error is actually a 400 or something...
        // handleNetworkError
        handleNetworkError(e.networkError);
      } else {
        throw e;
      }
    }),
    requestLink,
    link
  ]),
  typeDefs: typeDefs,
  resolvers: resolvers
});

// Initialize state
cache.writeData({
  data: {
    selectedComponentId: undefined
  }
});

export default client;
