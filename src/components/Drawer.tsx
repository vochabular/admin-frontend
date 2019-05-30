import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/styles";
import DrawerMui from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import history from "myHistory";
import { styles } from "styles";
import { getAdministrativeRoutes, getMainRoutes } from "privateRoutes";

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
  // @ts-ignore
  <ListItem {...props} component={Link as any} />
);

function Drawer(props: Props) {
  // TODO: Need to set the role based on the auth0 client!
  const currentRole = "admin";
  const mainRoutes = getMainRoutes(currentRole || "", true);
  const administrativeRoutes = getAdministrativeRoutes(currentRole || "", true);

  const { classes, isDrawerOpen, toggleDrawer } = props;
  // Get location to check which menu item should be active
  const location = history.location.pathname; // TODO: We should use the withRouter HOC and not imported history. Because otherwise the state flow is screwed up!

  const { t } = useTranslation();

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
              key={Array.isArray(r.path) ? r.path[0] : r.path}
              button={true}
              to={Array.isArray(r.path) ? r.path[0] : r.path}
              selected={location === r.path}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={t(`${r.label}`)} />
            </LinkListItem>
          );
        })}
      </List>
      <Divider />
      {administrativeRoutes.length ? (
        <React.Fragment>
          <List>
            <ListSubheader inset={true}>{t("administrative")}</ListSubheader>
            {administrativeRoutes.map(r => {
              const Icon = r.icon;
              return (
                <LinkListItem
                  key={Array.isArray(r.path) ? r.path[0] : r.path}
                  button={true}
                  to={Array.isArray(r.path) ? r.path[0] : r.path}
                  selected={location === r.path}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={t(`${r.label}`)} />
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
