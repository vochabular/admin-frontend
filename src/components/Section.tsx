import React, { ReactNode } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, FormHelperText } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";

interface Props extends WithStyles<typeof styles> {
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
}

/**
 * Section component that renders a title bar and a container for cards, single component....
 * @param props
 */
function Section({
  classes,
  title,
  titleTranslatable,
  titleComponent,
  children
}: Props) {
  const { t } = useTranslation();

  const titleC = titleComponent || (
    <Typography variant="h4">
      {titleTranslatable ? t(title || "NoTitleDefined") : title}
    </Typography>
  );
  return (
    <React.Fragment>
      <Paper square={true} elevation={10} className={classes.header}>
        {titleC}
      </Paper>
      {children}
    </React.Fragment>
  );
}

export const styles = (theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing.unit * 3,
      backgroundColor: theme.palette.grey[700]
    }
  });

export default withStyles(styles)(Section);
