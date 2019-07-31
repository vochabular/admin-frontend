import { ApolloClient, DefaultOptions } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";

import { typeDefs, resolvers } from "./queries/resolvers";

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

// On each request, set the current idToken in the header
const request = async (operation: any) => {
  /**
   * TODO(df): Need to get the token from the new AuthContext
   * Something like: console.log(AuthContext["_currentValue"]);
   */
  // @ts-ignore
  const idToken = window.idToken;
  operation.setContext({
    headers: {
      // Authorization: `Bearer ${idToken}`,
      // "X-Hasura-Role": currentRole,
      authorization: "Bearer " + idToken
    }
  });
};

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

const client = new ApolloClient({
  defaultOptions,
  cache,
  link: ApolloLink.from([
    /**
     * TODO(df): Central error handling. For example, on mutation error, we should show a "error" notification. When no network, we should alert the user...
     *
     */
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // TODO: We should send something to sentry...
        // sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        // TODO: We should logout the user, if the network error is actually a 400 or something...
        // handleNetworkError
      }
    }),
    requestLink,
    new HttpLink({
      uri: process.env.REACT_APP_BACKEND_URL
    })
  ]),
  typeDefs: typeDefs,
  resolvers: resolvers
});

export default client;
