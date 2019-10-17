import { createMuiTheme } from "@material-ui/core/styles";

/**
 * Language contexts are used for example to color the text accordingly, whether its CH, de or native language
 */
export enum LanguageContext {
  swissgerman = "swissGerman",
  german = "german",
  native = "native"
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
  }
}

const theme = createMuiTheme({
  direction: "ltr",
  palette: {
    type: "dark",
    primary: {
      main: "#006699"
    },
    secondary: {
      main: "#f44336",
      dark: "#ba000d"
    }
  },
  languageContextColors: {
    swissGerman: "#2E76AD",
    german: "#1C9D5A",
    native: "#1D1D1B"
  }
});

export default theme;
