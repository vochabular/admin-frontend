import * as React from "react";
import * as Sentry from "@sentry/browser";
import auth0Client from "src/auth/Auth";
import {Auth0Error, Auth0UserProfile} from "auth0-js";

type props = {};
type state = { error: boolean };

class ErrorBoundary extends React.Component<props, state> {
    constructor(props: any) {
        super(props);
        this.state = {error: false};
    }

    componentDidCatch(error: Error, errorInfo: any) {
        this.setState({error: true});
        auth0Client.getProfile((error: Auth0Error, profile: Auth0UserProfile) => {
            Sentry.withScope(scope => {
                scope.setUser({
                    "email": profile.email,
                    "username": profile.nickname
                });
                scope.setExtra("user_role", auth0Client.getRoles());
                Object.keys(errorInfo).forEach(key => {
                    scope.setExtra(key, errorInfo[key]);
                });
                Sentry.captureException(error);
            });
        });
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
                <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}

export default (ErrorBoundary)