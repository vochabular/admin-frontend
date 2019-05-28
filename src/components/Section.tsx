import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import { withTheme, WithTheme, Color } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  header: (greyScale: number) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[greyScale as keyof Color]
  })
}));

interface Props extends WithTheme {
  /**
   * Title as a raw string. If its a translatable title, then pass for example "chapters:chapter"
   */
  title?: string;
  /**
   * True if the title should be translated
   */
  titleTranslatable?: boolean;
  /**
   * If you want to render a title component
   */
  titleComponent?: ReactNode;
  children?: ReactNode;
  greyScale?: number;
}

/**
 * Section component that renders a title bar and a container for cards, single component....
 * @param props
 */
function Section({
  title,
  titleTranslatable,
  titleComponent,
  children,
  greyScale = 700,
  theme,
  ...otherProps
}: Props) {
  const classes = useStyles(greyScale);

  const { t } = useTranslation();

  const titleC = titleComponent || (
    <Typography variant="h4">
      {titleTranslatable ? t(title || "NoTitleDefined") : title}
    </Typography>
  );

  return (
    <React.Fragment>
      <Paper square={true} className={classes.header} {...otherProps}>
        {titleC}
      </Paper>
      {children}
    </React.Fragment>
  );
}

export default withTheme(Section);
