/**
 * Wrapper functions for date-fns to include the locale, format etc...
 */
import {
  format as formatLib,
  formatRelative as formatRelativeLib,
  formatDistance as formatDistanceLib
} from "date-fns";
import { enGB, de, fr } from "date-fns/locale";
import i18n from "./i18n";

const locales: { [key: string]: Locale } = { enGB, de, fr };

export function format(date: Date, formatStr: string) {
  return formatLib(date, formatStr, {
    locale: locales[i18n.language]
  });
}

export function formatRelative(date: Date, baseDate: Date) {
  return formatRelativeLib(date, baseDate, {
    locale: locales[i18n.language]
  });
}

export function formatDistance(date: Date, baseDate: Date) {
  return formatDistanceLib(date, baseDate, {
    addSuffix: true,
    includeSeconds: true,
    locale: locales[i18n.language]
  });
}

export function formatAgo(date: Date) {
  return formatDistance(date, new Date());
}
