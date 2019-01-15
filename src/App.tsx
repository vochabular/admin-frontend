import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import Routes from "./Routes";
import auth0Client from "./auth/Auth";
import "./App.css";
import LandingPage from "./pages/LandingPage";

// Provide types for the component. You can also use interfaces, but a general rule of thumb is to use `type` for React Component Props and State...
type AppProps = {
  name?: string;
};

type AppState = {
  authenticated: boolean;
};

class App extends Component<AppProps, AppState> {
  state: AppState = {
    authenticated: false
  };
  /**
   * On app start, renew the session incase the user has logged in already before
   */
  componentDidMount() {
    const { renewSession } = auth0Client;
    if (localStorage.getItem("isLoggedIn") === "true") {
      renewSession();
      this.setState({ authenticated: true });
    }
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div className="App">
        <CssBaseline />
        <Routes isAuthenticated={authenticated} />
      </div>
    );
  }
}

export default App;

/* 
<header className="App-header" />
*/
