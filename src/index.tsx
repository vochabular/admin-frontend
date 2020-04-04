import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import { ApolloProvider } from "@apollo/react-hooks";

import { ThemeProvider } from "@material-ui/core/styles";

import "./index.css";
import App from "./App";
import "./i18n";
import apolloClient from "./ApolloClient";
import theme from "./theme";
import * as serviceWorker from "./serviceWorker";
import packageJson from "../package.json";
import { AuthProvider, onRedirectCallback } from "contexts/AuthContext";
import { Router } from "react-router-dom";
import myHistory from "myHistory";

// TODO: How can we use the values from our .env file?
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_URL,
    environment: process.env.NODE_ENV,
    release: `${packageJson.name}@${packageJson.version}`,
    debug: false // process.env.NODE_ENV === "development"
  });
} else {
  const whyDidYouRender = require("@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js");
  whyDidYouRender(React);
}

ReactDOM.render(
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
    </AuthProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
