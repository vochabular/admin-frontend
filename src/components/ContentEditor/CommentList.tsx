import * as React from "react";

import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import theme from "src/theme";

interface Props extends WithStyles<typeof styles> {}

const CommentList = ({ classes }: Props) => {
  return (
    <Paper square className={classes.header}>
      CommentList
    </Paper>
  );
};

export const styles = (theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.grey[700]
    }
  });

export default withStyles(styles, { withTheme: true })(CommentList);
