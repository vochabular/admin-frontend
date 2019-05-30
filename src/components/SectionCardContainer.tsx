import React, { ReactNode } from "react";

import { withStyles, WithStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

interface Props extends WithStyles<typeof styles> {
  children?: ReactNode;
}

/**
 * SectionCardContainer component that renders a title bar and a container for cards, single component....
 * @param props
 */
function SectionCardContainer({ classes, children }: Props) {
  return (
    <Grid container spacing={2} className={classes.container}>
      {children}
    </Grid>
  );
}

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2)
    }
  });

export default withStyles(styles)(SectionCardContainer);
