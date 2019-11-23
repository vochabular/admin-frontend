import * as React from "react";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {}
}));

interface Props {
  content?: React.ReactNode;
}

const ComponentBody = ({ content }: Props) => {
  const classes = useStyles({});

  if (!content) return null;

  return (
    <Grid
      item
      container
      justify="space-between"
      alignItems="stretch"
      className={classes.container}
    >
      {content}
    </Grid>
  );
};

export default ComponentBody;
