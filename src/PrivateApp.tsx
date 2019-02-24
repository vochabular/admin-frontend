import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { Switch, Route } from "react-router";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";

import auth0Client from "src/auth/Auth";
import { styles } from "src/styles";
import { getAllAccessibleRoutes } from "src/privateRoutes";
import NotFound404 from "src/components/404";
import AppBar from "src/components/AppBar";

// TODO: We should have the AppBar in a own component. However, that messes up the layout...
// import AppBar from "../components/AppBar";

interface Props extends WithStyles<typeof styles> {}

const PrivateApp: React.FunctionComponent<Props> = ({ classes }) => {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const accessibleRoutes = getAllAccessibleRoutes("admin", false);

  return (
    <div className={classes.root}>
      <AppBar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !isDrawerOpen && classes.drawerPaperClose
          )
        }}
        open={isDrawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => toggleDrawer(!isDrawerOpen)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List />
        <Divider />
        <List />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
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
      </main>
    </div>
  );
};

export default withStyles(styles)(PrivateApp);
