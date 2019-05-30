import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import FormatListIcon from "@material-ui/icons/FormatListNumbered";

import Dashboard from "pages/Dashboard/Dashboard";
import Settings from "pages/Settings/Settings";
import Chapters from "./pages/Chapter/Chapters";
import Chapter from "./pages/Chapter/Chapter";

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
  icon?: any; // TODO: Need to find out how to use the proper type!
  path: string | string[];
  allowedRoles: string[];
  label?: string;
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
    label: "dashboard",
    icon: DashboardIcon,
    path: "/"
  },
  {
    showInDrawer: false,
    allowedRoles: allUsers,
    component: Chapter,
    exact: true, // TODO: Unfortunately, this doesn't match even if set to false, so we have to include it twice
    path: "/chapters/:chapterId"
  },
  {
    showInDrawer: false,
    allowedRoles: allUsers,
    component: Chapter,
    exact: false, // TODO: Unfortunately, this doesn't match even if set to false, so we have to include it twice
    path: "/chapters/:chapterId/:subChapterId"
  },
  {
    showInDrawer: true,
    allowedRoles: allUsers,
    component: Chapters,
    exact: true,
    label: "chapters",
    icon: FormatListIcon,
    path: "/chapters"
  }
];

export const administrativeRoutes: IPrivateRouteConfig[] = [
  {
    showInDrawer: true,
    allowedRoles: allUsers,
    component: Settings,
    exact: true,
    label: "settings",
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
  return [].concat(
    // @ts-ignore
    getMainRoutes(role, filterOnlyInDrawer),
    getAdministrativeRoutes(role, filterOnlyInDrawer)
  );
}
