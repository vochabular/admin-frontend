import React from "react";
import { useTranslation } from "react-i18next";
import Children from "react-children-utilities";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

import { LanguageContext } from "theme";

// Note: This type is not exported by default. With this, we can actually import and use it!
type TOptions = import("i18next").default.TOptions;

interface IText extends TypographyProps {
  /**
   * If set as false, then the content (children) passed along will not be attempted to be translated!
   */
  translate?: boolean;
  translationOptions?: TOptions;
  /**
   * If set, will color the text accordingly
   */
  languageContext?: LanguageContext;
}

interface StyleProps {
  languageContext: LanguageContext | undefined;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  text: props => ({
    marginRight: theme.spacing(2),
    color:
      props.languageContext &&
      theme.languageContextColors[props.languageContext]
  })
}));

const Text: React.FC<IText> = ({
  children,
  className,
  translate = true,
  translationOptions = {},
  languageContext,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const classes = useStyles({ languageContext });

  const text = Children.onlyText(children);

  return (
    <Typography {...otherProps} className={classes.text + " " + className}>
      {translate ? t(text, translationOptions) : text}
    </Typography>
  );
};

export default Text;
