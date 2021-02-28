import { createMuiTheme } from "@material-ui/core/styles";
import { EditStates } from "types/editStates";

/**
 * Language contexts are used for example to color the text accordingly, whether its CH, de or native language
 */
export enum LanguageContext {
  ch = "ch",
  de = "de",
  native = "native",
}

type LanguageContextColors = { [key in LanguageContext]: string };

/**
 * See here for how to use themeing
 * https://material-ui.com/customization/theming/
 */
declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    languageContextColors: LanguageContextColors;
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    languageContextColors: LanguageContextColors;
    editStateColors: { [key in EditStates]: string };
  }
}

const theme = createMuiTheme({
  direction: "ltr",
  palette: {
    type: "dark",
    primary: {
      main: "#006699",
    },
    secondary: {
      main: "#f44336",
      dark: "#ba000d",
    },
  },
  languageContextColors: {
    ch: "#2E76AD",
    de: "#1C9D5A",
    native: "#1D1D1B",
  },
  editStateColors: {
    C: "#9b6a6c",
    R: "#554348",
    U: "#077187",
    T: "#337357",
    F: "#6d9f71",
  },
});

export default theme;
