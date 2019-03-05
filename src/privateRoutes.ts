import * as React from "react";

import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";

import Dashboard from "src/pages/Dashboard/Dashboard";
import Settings from "src/pages/Settings/Settings";

/**
 * Roles defined as constants for reuse...
 */
const ADMIN = "admin";
const TRANSLATOR = "translator";
const CONTENT_CREATOR = "content_creator";
const allUsers = [ADMIN, TRANSLATOR, CONTENT_CREATOR];

interface IPrivateRouteConfig {
  showInDrawer: boolean;
  component: any; // TODO: Need to find out how to use the proper type!
  exact?: boolean;
  icon: any; // TODO: Need to find out how to use the proper type!
  path: string;

  allowedRoles: string[];
  label: string;
}

/**
 * All routes for external users
 */
export const mainRoutes: IPrivateRouteConfig[] = [
  {
    showInDrawer: true,
    allowedRoles: allUsers,
    component: Dashboard,
    exact: true,
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/"
  }
];

export const administrativeRoutes: IPrivateRouteConfig[] = [
  {
    showInDrawer: true,
    allowedRoles: allUsers,
    component: Settings,
    exact: true,
    label: "Settings",
    icon: SettingsIcon,
    path: "/settings"
  }
];

export function getMainRoutes(role: string, filterOnlyInDrawer: boolean) {
  return mainRoutes.filter(
    e =>
      e.allowedRoles.includes(role) &&
      (filterOnlyInDrawer ? e.showInDrawer : true)
  );
}

export function getAdministrativeRoutes(
  role: string,
  filterOnlyInDrawer: boolean
) {
  return administrativeRoutes.filter(
    a =>
      a.allowedRoles.includes(role) &&
      (filterOnlyInDrawer ? a.showInDrawer : true)
  );
}

/**
 * Combines the result of the above functions into a combined result set
 * @param role The current user's role
 * @param filterOnlyInDrawer True if you want only the routes that should be in the drawer
 */
export function getAllAccessibleRoutes(
  role: string,
  filterOnlyInDrawer: boolean
) {
  return new Array().concat(
    getMainRoutes(role, filterOnlyInDrawer),
    getAdministrativeRoutes(role, filterOnlyInDrawer)
  );
}
