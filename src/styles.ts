import { createStyles, FormHelperText } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

// Constants
const drawerWidth = 240;

/**
 * Create a new Material-UI theme. Using the HOC `withStyles` then injects the classes prop into the components.
 * Note that we need the helper utility. See below for more info
https://material-ui.com/guides/typescript/
 */
export const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex"
    },
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    fullWidthContainer: {
      width: "100%"
    },
    card: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing.unit * 4,
      alignItems: "center"
    },
    landingLogo: {
      display: "flex",
      width: theme.spacing.unit * 25,
      height: theme.spacing.unit * 25
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center"
    },
    toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    menuButtonHidden: {
      display: "none"
    },
    title: {
      flexGrow: 1
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing.unit * 9
      }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: "100vh",
      overflowX: "auto",
      width: "100%"
    },
    chartContainer: {
      marginLeft: -22
    },
    tableContainer: {
      height: 320
    },
    h5: {
      marginBottom: theme.spacing.unit * 2
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700]
      }
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing.unit * 10,
      right: theme.spacing.unit * 10
    }
  });
