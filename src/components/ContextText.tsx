import React from "react";

import Text from "./Text";
import {
  subscribeChapterById_chapter_components_texts_translations,
  subscribeChapterById_chapter_languages
} from "../queries/__generated__/subscribeChapterById";
import { LanguageContext } from "theme";
import { IText } from "./Text";

interface IContextText extends IText {
  /**
   * Input an array of translations, uses then the curren'ts user native language (or set manually on the wantedLangauge prop) to render the current language
   */
  translations:
    | subscribeChapterById_chapter_components_texts_translations[]
    | subscribeChapterById_chapter_languages[];
  /**
   * In case you want to override the default user settings based "native" language. I.e. "ch" for Swiss german, "de"...
   */
  wantedLanguage?: string; // TODO(df): Could type this with an enum from the backend, but then we would loose (?) dynamics?;
  /**
   * Set to false if the text should not get the default "native color". Defaults to yes.
   */
  isColorContext?: boolean;
  /**
   * Placeholder to render if no requested translation found
   */
  placeholder?: string;
  /**
   * Specify the name of the field you want the value from. By default, the "text_field" of texts...
   */
  textField?: string;
}

/**
 * A wrapper component for the generic "Text" component, allowing to pass an array of translations and a (optional) wanted language
 * @param param0
 */
const ContextText = ({
  translations,
  wantedLanguage,
  isColorContext = true,
  placeholder = "...",
  textField = "text_field",
  ...otherProps
}: IContextText) => {
  // TODO(df): Get current language. But from where? Which context?
  let currentLanguage = "en";
  let currentLanguageContext = LanguageContext.native;

  // Lookup translation: When no explicit wanted language is specified, then take the currentLanguage
  const wantedTranslation =
    translations[
      translations.findIndex(
        (
          t:
            | subscribeChapterById_chapter_components_texts_translations
            | subscribeChapterById_chapter_languages
        ) =>
          t.language.id === (wantedLanguage ? wantedLanguage : currentLanguage)
      )
    ];

  // Change context to german or swissgerman if applicable
  if (
    wantedLanguage &&
    (wantedLanguage === LanguageContext.ch ||
      wantedLanguage === LanguageContext.de)
  ) {
    currentLanguageContext =
      LanguageContext[wantedLanguage as keyof typeof LanguageContext];
  }

  return (
    <Text
      translate={false}
      languageContext={isColorContext ? currentLanguageContext : undefined}
      {...otherProps}
    >
      {wantedTranslation &&
      (wantedTranslation as { [key: string]: any })[textField] &&
      (wantedTranslation as { [key: string]: any })[textField].length
        ? (wantedTranslation as { [key: string]: any })[textField]
        : placeholder}
    </Text>
  );
};

export default ContextText;
