import React from "react";
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps
} from "react-router-dom";

import auth0Client from "../auth/Auth";

interface PrivateRouteProps extends RouteProps {
  component?:
    | any // TODO: Need to find out how not to use any here...
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

export default class PrivateRoute extends Route<PrivateRouteProps> {
  render() {
    const { component: Component, ...rest }: PrivateRouteProps = this.props;
    const renderComponent: RenderComponent = props =>
      auth0Client.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );

    return <Route {...rest} render={renderComponent} />;
  }
}
