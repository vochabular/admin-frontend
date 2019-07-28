import React, { useEffect } from "react";
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps
} from "react-router-dom";

import auth0Client from "../auth/Auth";
import { useAuth } from "contexts/AuthContext";
import LoadingPage from "pages/LoadingPage";

interface IPrivateRouteProps extends RouteProps {
  component?:
    | any // TODO: Need to find out how not to use any here...
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { loading, isAuthenticated, loginWithRedirect, user } = useAuth();

  // TODO(df): Needs to come from where?
  const path = "/";

  useEffect(() => {
    const fn = async () => {
      if (!loading && !isAuthenticated) {
        console.log("Redirecting...");
        console.log(path);
        await loginWithRedirect({
          appState: { targetUrl: path }
        });
      }
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  if (loading) return <LoadingPage />;
  if (!isAuthenticated) return null;

  // TODO(df): Somehow, we have to catch this, as otherwise typescript complains
  if (!Component) return null;

  const renderComponent: RenderComponent = props => <Component {...rest} />;

  return <Route {...rest} render={renderComponent} />;
};

export default PrivateRoute;
