import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import classNames from "classnames";
import { useMutation } from "@apollo/react-hooks";

import { makeStyles, Theme, Grid } from "@material-ui/core";

import ComponentList from "./ComponentList";
import ComponentSelector from "./ComponentSelector";
import { subscribeChapterById_chapter } from "queries/__generated__/subscribeChapterById";
import { useSelector, useDispatch } from "react-redux";
import { TAppState } from "reducers";
import { IContentEditorState, actions } from "reducers/contentEditorSlice";
import { CREATE_COMPONENT, UPDATE_COMPONENT } from "queries/component";
import Settings from "./Settings";

export const TOP_LEVEL_COMPONENT_TYPE = "top-level-component";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: "grey",
    padding: theme.spacing(5)
  }
}));

interface Props {
  data: subscribeChapterById_chapter;
}

const ContentEditor = ({ data }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedComponent } = useSelector<TAppState, IContentEditorState>(
    state => state.contentEditor
  );

  const unselectComponent = React.useCallback(
    () => dispatch(actions.setSelectedComponent()),
    [dispatch]
  );

  const [
    createComponent,
    { loading: createLoading, error: createError }
  ] = useMutation(CREATE_COMPONENT);

  const [
    updateComponent,
    { loading: updateLoading, error: updateError }
  ] = useMutation(UPDATE_COMPONENT);

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

    // INSERT: When the source is the component-selector-<id>, then its actually a creation of a new component
    if (result.source.droppableId.startsWith("component-selector-")) {
      createComponent({
        variables: {
          input: {
            fk_chapter_id: data.id,
            fk_component_id:
              (selectedComponent && selectedComponent.id) || null,
            fk_component_type_id: result.draggableId,
            data: "",
            order_in_chapter: result.destination.index + 1,
            state: "C",
            locked_ts: new Date()
          }
        }
      });
    }

    // UPDATE: When the source is within the component list (any level), then it must be an update of a component
    else if (result.source.droppableId.startsWith("component-list-")) {
      updateComponent({
        variables: {
          id: result.draggableId,
          data: {
            order_in_chapter: result.destination.index + 1
          }
        }
      });
    }
  }

  const handleClickAway = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    unselectComponent();
  };

  return (
    <>
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
              onClick={handleClickAway}
            >
              <ComponentList components={data.components || []} level={0} />
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
      <Settings />
    </>
  );
};

export default ContentEditor;
