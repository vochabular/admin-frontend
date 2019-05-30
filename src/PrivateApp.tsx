import React from "react";
import { Switch, Route } from "react-router";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/styles";

import { styles } from "styles";
import { getAllAccessibleRoutes } from "privateRoutes";
import NotFound404 from "components/404";
import AppBar from "components/AppBar";
import Drawer from "components/Drawer";
import useToggle from "hooks/useToggle";
import SetupWizard from "./pages/SetupWizard/SetupWizard";
import { GET_SETTINGS } from "./queries/settings";
import BusyOrErrorCard from "./components/BusyOrErrorCard";

// TODO: We should have the AppBar in a own component. However, that messes up the layout...
// import AppBar from "../components/AppBar";

interface Props extends WithStyles<typeof styles> {}

const PrivateApp: React.FunctionComponent<Props> = ({ classes }) => {
  const { toggler: isDrawerOpen, handleToggler: toggleDrawer } = useToggle(
    false
  );

  // TODO: Need to actually get the current role from auth0Client. Via a setting to force a rerender?
  const accessibleRoutes = getAllAccessibleRoutes("admin", false);

  // TODO: Currently, we get the data from the local Apollo cache/state (notice the @client directive in the query!). Later we have to fetch this from the backend!
  const { data, error, loading } = useQuery(GET_SETTINGS);

  const hasCompletedSetup =
    data && data.settings && data.settings.hasCompletedSetup;

  return (
    <div className={classes.root}>
      <AppBar
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        isDrawerDeactivated={!hasCompletedSetup}
      />
      {!hasCompletedSetup ? null : (
        <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      )}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        {loading || error ? (
          <BusyOrErrorCard loading={loading} error={error} />
        ) : !hasCompletedSetup ? (
          <SetupWizard />
        ) : (
          <Switch>
            {accessibleRoutes.map((r: any) => (
              <Route
                key={r.path}
                path={r.path}
                exact={r.exact}
                component={r.component}
              />
            ))}
            <Route component={NotFound404} />
          </Switch>
        )}
      </main>
    </div>
  );
};

export default withStyles(styles)(PrivateApp);
