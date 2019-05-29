import * as React from "react";
import { useTranslation } from "react-i18next";

import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";
import { Avatar, Typography, Grid } from "@material-ui/core";
import TimestampAgo from "./TimestampAgo";

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
  data: any;
}

const Comment = ({ classes, data }: Props) => {
  const { t } = useTranslation();

  const initialLetters = `${(
    (data.authorName && data.authorName.firstName) ||
    "-"
  )
    .charAt(0)
    .toUpperCase()}${((data.authorName && data.authorName.lastName) || "-")
    .charAt(0)
    .toUpperCase()}`;

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          className={classes.avatar}
          style={{
            backgroundColor: stringToColor(
              (data.authorName &&
                data.authorName.firstName + data.authorName.lastName) ||
                initialLetters
            )
          }}
        >
          {initialLetters}
        </Avatar>
        <TimestampAgo date={new Date(data.written || 0)} variant="caption" />
      </Grid>
      <Grid item alignItems="center">
        <Typography>{data.comment}</Typography>
      </Grid>
    </Grid>
  );
};

export const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      margin: 10
    }
  });

export default withStyles(styles, { withTheme: true })(Comment);
