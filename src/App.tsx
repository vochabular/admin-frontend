import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import "./App.css";
import LoadingPage from "./pages/LoadingPage";
import { useAuth } from "contexts/AuthContext";
import PrivateApp from "PrivateApp";
import PrivateRoute from "components/PrivateRoute";
import NotFound404 from "components/404";
import LoginPage from "pages/LoginPage";

/**
 * Main app component with routing for logged in users (private) and public routes
 * Note: Although there are various ways how to define a new React component, to benefit from the best typings, use this style:
 * export default const Foo: React.FC<IFooProps> = (FooProps) => <Bar />
 */
const App: React.FC = () => {
  const { loading, isAuthenticated } = useAuth();
  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        {loading ? (
          <LoadingPage />
        ) : (
          <Switch>
            {isAuthenticated && (
              <Route path="/login" exact render={() => <Redirect to="/" />} />
            )}
            {!isAuthenticated && (
              <Route path="/login" exact component={LoginPage} />
            )}
            {!isAuthenticated && (
              <Route path="/help" exact render={() => <div>Help</div>} />
            )}
            {!isAuthenticated && (
              <Route path="/404" exact component={NotFound404} />
            )}
            {!isAuthenticated && (
              <Route path="/" exact render={() => <Redirect to="/login" />} />
            )}
            <PrivateRoute path="/" component={PrivateApp} />
            <Redirect to="/404" />
          </Switch>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
