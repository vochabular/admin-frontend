import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// import translations
import en from "locales/en.json";
import de from "locales/de.json";

// Language detector options
const options = {
  // order and from where user language should be detected
  order: [
    "querystring",
    "cookie",
    "localStorage",
    "navigator",
    "htmlTag",
    "path",
    "subdomain"
  ],

  // keys or params to lookup language from
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ["localStorage", "cookie"],
  excludeCacheFor: ["cimode"] // languages to not persist (cookie, localStorage)
};

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en,
  de
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en",
    ns: ["common", "chapters"], // Here we can define namespaces to group/order the translations into modules. Would support lazy loading at a later stage..
    defaultNS: "common",
    resources,
    keySeparator: false, // we do not use keys in form messages.welcome
    whitelist: Object.keys(resources),
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    detection: options //
  });

export default i18n;
