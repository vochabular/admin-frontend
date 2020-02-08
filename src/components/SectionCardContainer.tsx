import React, { ReactNode } from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2)
    }
  });

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

export default withStyles(styles)(SectionCardContainer);
