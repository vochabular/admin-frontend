import React, { Fragment, useState } from "react";
import classNames from "classnames";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";
import auth0Client from "../auth/Auth";

import { styles } from "../styles";

// TODO: We should have the AppBar in a own component. However, that messes up the layout...
// import AppBar from "../components/AppBar";

interface Props extends WithStyles<typeof styles> {}

const Dashboard: React.FunctionComponent<Props> = ({ classes }) => {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  return (
    <div className={classes.root}>
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
        <Typography variant="h4" gutterBottom component="h2">
          Chapters
        </Typography>
        <Typography component="div" className={classes.chartContainer} />
        <Typography variant="h4" gutterBottom component="h2">
          Voggi
        </Typography>
        <div className={classes.tableContainer} />
      </main>
    </div>
  );
};

export default withStyles(styles)(Dashboard);
