import React from "react";
import { useTranslation } from "react-i18next";
import Children from "react-children-utilities";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

// Note: This type is not exported by default. With this, we can actually import and use it!
type TOptions = import("i18next").default.TOptions;

interface IText extends TypographyProps {
  /**
   * If set as false, then the content (children) passed along will not be attempted to be translated!
   */
  translate?: boolean;
  translationOptions?: TOptions;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      marginRight: theme.spacing(2)
    }
  })
);

const Text: React.FC<IText> = ({
  children,
  className,
  translate = true,
  translationOptions = {},
  ...otherProps
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const text = Children.onlyText(children);

  return (
    <Typography {...otherProps} className={classes.text + " " + className}>
      {translate ? t(text, translationOptions) : text}
    </Typography>
  );
};

export default Text;
