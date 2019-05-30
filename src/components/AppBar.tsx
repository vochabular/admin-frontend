import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { Switch, Route } from "react-router";

import { withStyles, WithStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AppBarMui from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";

import auth0Client from "src/auth/Auth";
import { styles } from "src/styles";
import { getAllAccessibleRoutes } from "src/privateRoutes";

// TODO: We should have the AppBar in a own component. However, that messes up the layout...
// import AppBar from "../components/AppBar";

interface Props extends WithStyles<typeof styles> {
  isDrawerDeactivated?: boolean;
  isDrawerOpen: boolean;
  toggleDrawer: any;
}

function AppBar(props: Props) {
  const { classes, isDrawerOpen, toggleDrawer, isDrawerDeactivated } = props;

  return (
    <AppBarMui
      //position="absolute"
      className={classNames(
        classes.appBar,
        isDrawerOpen && classes.appBarShift
      )}
    >
      <Toolbar disableGutters={!isDrawerOpen} className={classes.toolbar}>
        {isDrawerDeactivated ? null : (
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => toggleDrawer(!isDrawerOpen)}
            className={classNames(
              classes.menuButton,
              isDrawerOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Vochabular Dashboard
        </Typography>
        <IconButton color="inherit">
          <Badge
            badgeContent={Math.floor(Math.random() * 10)}
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={() => auth0Client.logout()}>
          <PowerIcon />
        </IconButton>
      </Toolbar>
    </AppBarMui>
  );
}

export default withStyles(styles)(AppBar);
