import React from "react";
import { Switch, Route } from "react-router";
import { useQuery } from "@apollo/react-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "styles";
import { getAllAccessibleRoutes } from "privateRoutes";
import NotFound404 from "components/404";
import AppBar from "components/AppBar";
import Drawer from "components/Drawer";
import useToggle from "hooks/useToggle";
import SetupWizard from "./pages/SetupWizard/SetupWizard";
import BusyOrErrorCard from "./components/BusyOrErrorCard";
import i18n from "i18n";
import LoadingPage from "pages/LoadingPage";
import { Role } from "rbac-rules";
import { useAuth } from "contexts/AuthContext";
import { GET_DJANGO_PROFILE } from "queries/profile";
import {
  profile as TProfile,
  profileVariables,
} from "queries/__generated__/profile";

function isEmpty(obj: object) {
  return !obj || Object.keys(obj).length === 0;
}

// TODO: We should have the AppBar in a own component. However, that messes up the layout...
// import AppBar from "../components/AppBar";

interface Props extends WithStyles<typeof styles> {}

const PrivateApp: React.FunctionComponent<Props> = ({ classes }) => {
  const { user, changeCurrentRole, setUserId } = useAuth();
  const { toggler: isDrawerOpen, handleToggler: toggleDrawer } = useToggle(
    false
  );

  const currentUserEmail = user && user.email;

  /**
   * Note: Getting the user profile via Django, as the user will be created on the fly by Django!
   */
  const { data, error, loading } = useQuery<TProfile, profileVariables>(
    GET_DJANGO_PROFILE,
    {
      variables: { username: currentUserEmail || "" },
      fetchPolicy: "network-only",
    }
  );

  /**
   * Need this hack to "reload", since upon the first request by the user, django has not created yet the user and the profile.
   * So we reload the page after a while, hoping that the user was created...
   */
  if (!loading && data && isEmpty(data)) {
    setTimeout(function () {
      window.location.reload();
    }, 1000);

    return <LoadingPage />;
  }

  const profile = data?.profile;

  const hasCompletedSetup = (profile && profile.setupCompleted) || false;

  // When we have received the profile data, we can update a few things...
  if (profile) {
    profile.language && i18n.changeLanguage(profile.language.id);
    changeCurrentRole(profile?.currentRole);
    setUserId(profile.id);
  }

  const accessibleRoutes = getAllAccessibleRoutes(
    (user && user.currentRole) || Role.VIEWER,
    false
  );

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

        {loading ? (
          <BusyOrErrorCard loading={loading} error={error} />
        ) : !hasCompletedSetup ? (
          data && profile && <SetupWizard profile={profile} />
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
