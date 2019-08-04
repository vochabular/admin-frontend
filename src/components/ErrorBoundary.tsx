import * as React from "react";
import * as Sentry from "@sentry/browser";

import { AuthContext } from "contexts/AuthContext";

type props = {};
type state = { error: boolean };

class ErrorBoundary extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = { error: false };
  }
  // Assign a contextType to read the current auth context.
  // React will find the closest Auth Provider above and use its value.
  static contextType = AuthContext;

  componentDidCatch(error: Error, errorInfo: any) {
    const { user } = this.context;
    this.setState({ error: true });
    Sentry.withScope(scope => {
      scope.setUser({
        email: user.email,
        username: user.nickname
      });
      scope.setExtra("user_role", user.currentRole);
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
        <button onClick={() => Sentry.showReportDialog()}>
          Report feedback
        </button>
      );
    } else {
      //when there's not an error, render children untouched
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
