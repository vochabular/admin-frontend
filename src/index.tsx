import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";

import { ThemeProvider } from "@material-ui/styles";

import "./index.css";
import App from "./App";
import "./i18n";
import apolloClient from "./ApolloClient";
import theme from "./theme";
import * as serviceWorker from "./serviceWorker";
import packageJson from "../package.json";
import { AuthProvider, onRedirectCallback } from "contexts/AuthContext";
import configureAppStore from "configureStore";
import { Router } from "react-router-dom";
import myHistory from "myHistory";

const store = configureAppStore();

// TODO: How can we use the values from our .env file?
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_URL,
    environment: process.env.NODE_ENV,
    release: `${packageJson.name}@${packageJson.version}`,
    debug: false // process.env.NODE_ENV === "development"
  });
}

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      client_id={process.env.REACT_APP_AUTH0_CLIENTID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Router history={myHistory}>
            <App />
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
