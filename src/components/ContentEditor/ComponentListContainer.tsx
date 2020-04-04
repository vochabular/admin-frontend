import * as React from "react";

import { Grid, Theme, CircularProgress } from "@material-ui/core";

import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import { Droppable } from "react-beautiful-dnd";
import Dropzone from "./Dropzone";
import { TOP_LEVEL_COMPONENT_TYPE } from "./ContentEditor";
import { makeStyles } from "@material-ui/core/styles";
import ComponentList from "./ComponentList";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: "grey",
    padding: theme.spacing(5),
    overflowY: "auto",
    // Hack to make overflow work properly. Adjust accordingly if the header changes
    height: "calc(100vh - 64px - 148.9px - 100px)"
  }
}));

interface ComponentListContainerProps {
  onClickAway: any;
  placeholderProps: any;
  loading: boolean;
  components: subscribeChapterById_chapter_components[];
}

const ComponentListContainer = (props: ComponentListContainerProps) => {
  const classes = useStyles();
  const { placeholderProps, loading, onClickAway, components } = props;
  return (
    <Droppable
      droppableId={`component-list-${TOP_LEVEL_COMPONENT_TYPE}`}
      type={TOP_LEVEL_COMPONENT_TYPE}
    >
      {(provided, snapshot) => (
        <Grid
          ref={provided.innerRef}
          className={classes.container}
          onClick={onClickAway}
          style={
            (snapshot.isDraggingOver && {
              backgroundColor: "lightblue"
            }) ||
            {}
          }
        >
          {loading ? <CircularProgress /> : null}
          <ComponentList components={components || []} level={0} />
          {provided.placeholder}
          {provided.placeholder && (
            <Grid item>
              <Dropzone />
            </Grid>
          )}
          <div
            style={{
              // @†s-ignore
              top: placeholderProps.clientY,
              // @†s-ignore
              left: placeholderProps.clientX,
              // @†s-ignore
              height: placeholderProps.clientHeight,
              background: "tomato",
              // @†s-ignore
              width: placeholderProps.clientWidth
            }}
          />
        </Grid>
      )}
    </Droppable>
  );
};

export default ComponentListContainer;
