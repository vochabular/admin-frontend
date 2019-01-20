import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  direction: "ltr",
  typography: {
    useNextVariants: true
  },
  palette: {
    type: "dark",
    primary: {
      light: "#5cbdb4",
      main: "#006699"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});

export default theme;
