import React from "react";

import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * Component for displaying loading indicator
 */
const styles = (theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2)
    }
  });

interface Props extends WithStyles<typeof styles> {}

const Callback = ({ classes }: Props) => (
  <div className="container">
    <CircularProgress className={classes.progress} />
  </div>
);

export default withStyles(styles)(Callback);
