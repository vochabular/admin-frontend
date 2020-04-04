import { getSelectedComponent_component_texts_translations } from "queries/__generated__/getSelectedComponent";
import { LanguageContext } from "theme";

/**
 * Transforms an array of translations into an object with SwissGerman, German and all native langauges in an array
 * @param translations
 */
export function transformTranslations(
  translations: getSelectedComponent_component_texts_translations[],
  currentNativeLanguage?: string
) {
  const swissGerman =
    translations &&
    translations.find(t => t.language.id === LanguageContext.ch);
  const german =
    translations &&
    translations.find(t => t.language.id === LanguageContext.de);
  const currentNativeTranslation =
    currentNativeLanguage &&
    translations &&
    translations.find(t => t.language.id === currentNativeLanguage);
  const nativeLanguages =
    (translations &&
      translations.filter(
        t =>
          !([LanguageContext.ch, LanguageContext.de] as string[]).includes(
            t.language.id
          )
      )) ||
    [];
  return { swissGerman, german, nativeLanguages, currentNativeTranslation };
}
