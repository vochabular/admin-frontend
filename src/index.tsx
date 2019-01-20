import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";

import "./index.css";
import App from "./App";
import history from "./history";
import theme from "./theme";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();