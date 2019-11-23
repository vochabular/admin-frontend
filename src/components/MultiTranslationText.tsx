import * as React from "react";

import { subscribeChapterById_chapter_components_texts } from "queries/__generated__/subscribeChapterById";
import ContextText from "./ContextText";
import Text from "./Text";

interface MultiTranslationTextProps {
  text: subscribeChapterById_chapter_components_texts;
}

/**
 * Renders based on an input text and its configured properties all relevant languages:
 * CH
 * DE
 * native language (current users language...)
 */
const MultiTranslationText = ({ text }: MultiTranslationTextProps) => {
  const { translations = [], translatable } = text || {};

  const ch = translations.find(t => t.language.id === "ch") && (
    <ContextText translations={translations} wantedLanguage="ch" />
  );
  const de = translations.find(t => t.language.id === "de") && (
    <ContextText translations={translations} wantedLanguage="de" />
  );
  const native = translatable && <ContextText translations={translations} />;

  // Filter the (possibly) sparse array
  const fields = [ch, de, native].filter(f => !!f);

  if (!fields.length) return <Text>noRelevantTranslationYet</Text>;

  return (
    <>
      {fields.map((f: any, idx) => (
        <React.Fragment key={idx}>
          {f}
          {idx !== fields.length - 1 ? (
            <Text translate={false}> / </Text>
          ) : null}
        </React.Fragment>
      ))}
    </>
  );
};

export default MultiTranslationText;
