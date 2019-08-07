import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import classNames from "classnames";

import { makeStyles, Theme, Grid } from "@material-ui/core";

import ComponentList from "./ComponentList";
import ComponentSelector from "./ComponentSelector";
import { subscribeChapterById_chapter } from "queries/__generated__/subscribeChapterById";
import { useSelector } from "react-redux";
import { TAppState } from "reducers";
import { IContentEditorState } from "reducers/contentEditorSlice";

export const TOP_LEVEL_COMPONENT_TYPE = "top-level-component";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: "grey",
    padding: theme.spacing(5)
  }
}));

/**
 * Is called when the drag ends. Main function that handles all the logic related to DragAndDrop
 */
function onDragEnd(result: DropResult) {
  // If dropped outside of the list
  if (!result.destination) {
    return;
  }

  // Do nothing if dropped at the same spot
  if (result.destination.index === result.source.index) {
    return;
  }
}

interface Props {
  data: subscribeChapterById_chapter;
}

const ContentEditor = ({ data }: Props) => {
  const classes = useStyles();
  const { selectedComponent } = useSelector<TAppState, IContentEditorState>(
    state => state.contentEditor
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={`component-selector-${TOP_LEVEL_COMPONENT_TYPE}`}
        type={
          !selectedComponent
            ? TOP_LEVEL_COMPONENT_TYPE
            : `${selectedComponent.type.name}-${selectedComponent.id}`
        }
        isDropDisabled={true}
        direction="horizontal"
      >
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ComponentSelector />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* This is the "top-level" droppable area. Note that draggables can only be dropped within a droppable with the same type! */}
      <Droppable
        droppableId={`component-list-${TOP_LEVEL_COMPONENT_TYPE}`}
        type={TOP_LEVEL_COMPONENT_TYPE}
      >
        {(provided, snapshot) => (
          <Grid
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classNames(classes.container)}
          >
            <ComponentList components={data.components || []} level={0} />
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ContentEditor;
