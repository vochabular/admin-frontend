import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { Icon, Grid, IconButton } from "@material-ui/core";
import { DragHandle } from "@material-ui/icons";

import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import ActionMenu from "./ActionMenu";

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  preview: {
    flex: 1,
  },
}));

interface Props {
  provided?: any;
  data: subscribeChapterById_chapter_components;
  preview?: React.ReactNode;
}

const ComponentHeader = ({ provided, data, preview }: Props) => {
  const classes = useStyles();
  const [isOver, setIsOver] = React.useState(false);

  return (
    <Grid
      item
      container
      justify="space-between"
      alignItems="stretch"
      className={classes.container}
    >
      {provided ? (
        <Grid
          item
          onMouseEnter={() => setIsOver(true)}
          onMouseLeave={() => setIsOver(false)}
        >
          <IconButton {...provided.dragHandleProps}>
            {isOver ? <DragHandle /> : <Icon>{data.type.icon}</Icon>}
          </IconButton>
        </Grid>
      ) : null}
      <Grid
        item
        container
        className={classes.preview}
        justify="center"
        alignItems="center"
      >
        {preview}
      </Grid>
      <Grid item>
        <ActionMenu data={data} />
      </Grid>
    </Grid>
  );
};

export default ComponentHeader;
