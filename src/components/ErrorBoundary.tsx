import * as React from "react";
import * as Sentry from "@sentry/browser";

type props = { };
type state = { error: boolean };

class ErrorBoundary  extends React.Component<props, state> {
    constructor(props: any) {
        super(props);
        this.state = { error: false };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        this.setState({ error: true });
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
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