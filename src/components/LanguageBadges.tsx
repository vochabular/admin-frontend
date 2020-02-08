import * as React from "react";

import {
  Avatar,
  makeStyles,
  Theme,
  createStyles,
  Typography
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";

import { LanguageContext } from "theme";
import { subscribeChapterById_chapter_components_texts } from "queries/__generated__/subscribeChapterById";

interface StyleProps {
  languageContext: LanguageContext | undefined;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    avatar: props => ({
      width: theme.spacing(3),
      height: theme.spacing(3),
      color:
        props.languageContext &&
        theme.palette.getContrastText(
          theme.languageContextColors[props.languageContext]
        ),
      backgroundColor:
        props.languageContext &&
        theme.languageContextColors[props.languageContext]
    })
  })
);

interface ILanguageBadgeProps {
  languageContext?: LanguageContext | undefined;
}

export function LanguageBadge({ languageContext }: ILanguageBadgeProps) {
  const classes = useStyles({ languageContext });
  return (
    <Avatar className={classes.avatar}>
      <Typography variant="caption">
        {languageContext === LanguageContext.native
          ? "LL"
          : languageContext?.toUpperCase()}
      </Typography>
    </Avatar>
  );
}

interface ILanguageBadgesProps {
  text: subscribeChapterById_chapter_components_texts;
}

export default function LanguageBadges({ text }: ILanguageBadgesProps) {
  if (!text) return null
  const languages = [
    text.translations.some(t => t.language.id === LanguageContext.ch) &&
      LanguageContext.ch,
    text.translations.some(t => t.language.id === LanguageContext.de) &&
      LanguageContext.de,
    text.translatable && LanguageContext.native
  ].filter(Boolean);
  return (
    <AvatarGroup>
      {languages.map(l => l && <LanguageBadge key={l} languageContext={l} />)}
    </AvatarGroup>
  );
}
