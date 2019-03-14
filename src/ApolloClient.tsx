import ApolloClient from "apollo-boost";
import auth0Client from "./auth/Auth";

export default new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL,
  // On each request, set the authorization header
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: auth0Client.getIdToken()
      }
    });
  }
});
