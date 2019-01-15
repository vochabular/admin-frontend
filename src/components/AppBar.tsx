import React from "react";
import classNames from "classnames";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";

import { styles } from "../styles";
import auth0Client from "../auth/Auth";

interface Props extends WithStyles<typeof styles> {
  isDrawerOpen: boolean;
  toggleDrawer: Function;
}

const MyAppBar: React.FunctionComponent<Props> = ({
  classes,
  isDrawerOpen,
  toggleDrawer
}) => {
  return (
    <AppBar
      //position="absolute"
      className={classNames(
        classes.appBar,
        isDrawerOpen && classes.appBarShift
      )}
    >
      <Toolbar disableGutters={!isDrawerOpen} className={classes.toolbar}>
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
    </AppBar>
  );
};

export default withStyles(styles)(MyAppBar);
