import { WithStyles, withStyles } from "@material-ui/core/styles";
import {
  getChapters_chapters_components,
  getChapters_chapters_languages,
} from "queries/__generated__/getChapters";
import * as React from "react";
import { styles } from "styles";

interface Props extends WithStyles<typeof styles> {
  components: getChapters_chapters_components[];
  languages: getChapters_chapters_languages[];
}
const ChapterLanguages: React.FC<Props> = ({ components, languages }) => {
  const translatableTexts = components
    .filter(({ texts }) => texts.length > 0 && texts.some((text) => text.translatable))
    .flatMap(({ texts }) => texts);

  const stateByLanguage = languages.reduce(
    (acc, { language }) => ({
      ...acc,
      [language.name]: 0,
    }),
    {},
  );

  // TODO: count translated texts
  console.log(translatableTexts);
  console.log(stateByLanguage);

  return (
    <ul style={{ textAlign: "left" }}>
      {Object.entries(stateByLanguage).map(([language, count]) => (
        <li key={language}>
          {language}: {count} / {translatableTexts.length}
        </li>
      ))}
    </ul>
  );
};

export default withStyles(styles, { withTheme: true })(ChapterLanguages);
