import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { Switch, Route } from "react-router";
import { Link } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import DrawerMui from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
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
import history from "src/history";
import { styles } from "src/styles";
import { getAllAccessibleRoutes } from "src/privateRoutes";
import { getAdministrativeRoutes, getMainRoutes } from "src/privateRoutes";

// TODO: We should have the AppBar in a own component. However, that messes up the layout...
// import AppBar from "../components/AppBar";

interface Props extends WithStyles<typeof styles> {
  isDrawerOpen: boolean;
  toggleDrawer: any;
}

/**
 * We need this since we "replace" the components root node with a component and Typescript will complain: https://material-ui.com/guides/typescript/
 */
interface ILinkListItemProps extends ListItemProps {
  to: string;
  replace?: boolean;
}

const LinkListItem = (props: ILinkListItemProps) => (
  <ListItem {...props} component={Link as any} />
);

function Drawer(props: Props) {
  const currentRole = "admin";
  const mainRoutes = getMainRoutes(currentRole || "", true);
  const administrativeRoutes = getAdministrativeRoutes(currentRole || "", true);

  const { classes, isDrawerOpen, toggleDrawer } = props;
  // Get location to check which menu item should be active
  const location = history.location.pathname; // TODO: We should use the withRouter HOC and not imported history. Because otherwise the state flow is screwed up!
  return (
    <DrawerMui
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
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {mainRoutes.map(r => {
          const Icon = r.icon;
          return (
            <LinkListItem
              key={r.path}
              button={true}
              to={r.path}
              selected={location === r.path}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={r.label} />
            </LinkListItem>
          );
        })}
      </List>
      <Divider />
      {administrativeRoutes.length ? (
        <React.Fragment>
          <List>
            <ListSubheader inset={true}>Administrative</ListSubheader>
            {administrativeRoutes.map(r => {
              const Icon = r.icon;
              return (
                <LinkListItem
                  key={r.path}
                  button={true}
                  to={r.path}
                  selected={location === r.path}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={r.label} />
                </LinkListItem>
              );
            })}
          </List>
          <Divider />
        </React.Fragment>
      ) : null}
    </DrawerMui>
  );
}

export default withStyles(styles)(Drawer);
