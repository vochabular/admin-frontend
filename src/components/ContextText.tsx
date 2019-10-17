import React from "react";

import Text from "./Text";
import { subscribeChapterById_chapter_components_texts_translations } from "../queries/__generated__/subscribeChapterById";
import { LanguageContext } from "theme";

interface IContextText {
  /**
   * Input an array of translations, uses then the curren'ts user native language (or set manually on the wantedLangauge prop) to render the current language
   */
  translations: subscribeChapterById_chapter_components_texts_translations[];
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
  ...otherProps
}: IContextText) => {
  // TODO(df): Get current language. But from where? Which context?
  let currentLanguage = "en";
  let currentLanguageContext = LanguageContext.native;

  // Lookup translation: When no explicit wanted language is specified, then take the currentLanguage
  const wantedTranslation =
    translations[
      translations.findIndex(
        t =>
          t.language.code ===
          (wantedLanguage ? wantedLanguage : currentLanguage)
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
      {wantedTranslation ? wantedTranslation.textField : placeholder}
    </Text>
  );
};

export default ContextText;
