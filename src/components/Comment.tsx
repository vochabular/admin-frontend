import * as React from "react";

import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";
import { Avatar, Typography, Grid } from "@material-ui/core";
import TimestampAgo from "./TimestampAgo";
import {
  subscribeAllComments_comments,
  subscribeAllComments_comments_answers
} from "queries/__generated__/subscribeAllComments";

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      margin: 10
    }
  });

/**
 * Generate a random color from a string
 * Source: https://github.com/mui-org/material-ui/issues/12700
 * @param string
 */
function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let colour = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += `00${value.toString(16)}`.substr(-2);
  }
  return colour;
}

interface Props extends WithStyles<typeof styles> {
  /**
   * TODO: A single discussion
   */
  data: subscribeAllComments_comments | subscribeAllComments_comments_answers;
}

const Comment = ({ classes, data }: Props) => {
  const { text = "", created = 0 } = data;
  const { firstname = "", lastname = "" } = data.author || {};
  const initialLetters = `${(firstname || "-").charAt(0).toUpperCase()}${(
    lastname || "-"
  )
    .charAt(0)
    .toUpperCase()}`;

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          className={classes.avatar}
          style={{
            backgroundColor: stringToColor(
              firstname + lastname || initialLetters
            )
          }}
        >
          {initialLetters}
        </Avatar>
        <TimestampAgo date={new Date(created)} variant="caption" />
      </Grid>
      <Grid item>
        <Typography>{text}</Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(Comment);
