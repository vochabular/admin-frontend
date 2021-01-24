import { Typography } from "@material-ui/core";
import {
  makeStyles,
  Theme,
  WithStyles,
  withStyles,
  withTheme,
} from "@material-ui/core/styles";
import {
  getChapters_chapters_components,
  getChapters_chapters_languages,
} from "queries/__generated__/getChapters";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { styles } from "styles";

interface Props extends WithStyles<typeof styles> {
  components: getChapters_chapters_components[];
  languages: getChapters_chapters_languages[];
}
const ChapterLanguages: React.FC<Props> = ({ components, languages }) => {
  const { t } = useTranslation("chapters");
  const { spacing } = useStyles();

  // e.g. { de: { translations: 5, valid: 3 }, … }
  const state = languages.reduce(
    (acc, { language: { id } }) => ({ ...acc, [id]: { translations: 0, valid: 0 } }),
    {} as { [key: string]: { translations: number; valid: number } },
  );
  components
    .filter(({ texts }) => texts.length > 0 && texts.some((text) => text.translatable))
    .flatMap(({ texts }) => texts)
    .forEach(({ translations }) =>
      translations.forEach(({ language: { id }, valid }) => {
        state[id].translations++;
        valid && state[id].valid++;
      }),
    );

  return (
    <>
      <Typography variant="h6" component="h3" className={spacing}>
        {t("translationProgress")}
      </Typography>
      <LanguageList>
        {Object.entries(state).map(([language, { translations, valid }]) => (
          <LanguageListItem key={language}>
            <span style={{ width: "32px" }}>{language.toUpperCase()}</span>
            <ProgressBar filled={valid / translations} />
            <Count>
              {valid} / {translations}
            </Count>
          </LanguageListItem>
        ))}
      </LanguageList>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(ChapterLanguages);

const useStyles = makeStyles((theme: Theme) => ({
  spacing: {
    marginTop: theme.spacing(2),
  },
}));

const LanguageList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
`;

const LanguageListItem = styled.li`
  display: flex;
  align-items: center;
`;

const Count = withTheme(styled.span`
  color: ${({ theme: { palette } }) => palette.grey[500]};
  font-size: 0.75em;
  width: 32px;
  text-align: right;
`);

const ProgressBar = withTheme(styled.span<{ filled: number }>`
  margin: 0 4px;
  border: 1px solid ${({ theme: { palette } }) => palette.grey[500]};
  flex-grow: 1;
  background: linear-gradient(
    to right,
    ${({ theme: { palette } }) => palette.primary.main} ${({ filled }) => filled * 100}%,
    transparent ${({ filled }) => filled * 100}%
  );
  height: 10px;
`);
