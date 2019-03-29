import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import Routes from "./Routes";
import auth0Client from "./auth/Auth";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoadingPage from "./pages/LoadingPage";

// Provide types for the component. You can also use interfaces, but a general rule of thumb is to use `type` for React Component Props and State...
type IAppProps = {
  name?: string;
};

type IAppState = {
  initialized: boolean;
};

class App extends Component<IAppProps, IAppState> {
  public state: IAppState = {
    initialized: false
  };

  /**
   * On app start, renew the Auth0 session incase the user has logged in already before.
   * When everything is done, then set initialized to true
   */
  public async componentDidMount() {
    const { renewSession } = auth0Client;
    if (localStorage.getItem("isLoggedIn") === "true") {
      await renewSession();
    }
    this.setState({ initialized: true });
  }

  render() {
    const { initialized } = this.state;
    return (
      <div className="App">
        <CssBaseline />
        {initialized ? <Routes /> : <LoadingPage />}
      </div>
    );
  }
}

export default App;

/* 
<header className="App-header" />
*/
