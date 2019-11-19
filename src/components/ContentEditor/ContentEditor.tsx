import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import classNames from "classnames";
import { useMutation, useApolloClient, useQuery } from "@apollo/react-hooks";

import { makeStyles, Theme, Grid, CircularProgress } from "@material-ui/core";

import ComponentList from "./ComponentList";
import ComponentSelector from "./ComponentSelector";
import { subscribeChapterById_chapter } from "queries/__generated__/subscribeChapterById";
import {
  CREATE_COMPONENT,
  UPDATE_COMPONENT,
  GET_SELECTED_COMPONENT,
  GET_LOCAL_SELECTED_COMPONENT_ID
} from "queries/component";
import Settings from "./Settings";
import { getSelectedComponent } from "queries/__generated__/getSelectedComponent";
import { getSelectedComponentId } from "queries/__generated__/getSelectedComponentId";

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

/**
 * Component holding the main editor state, setting up the drag and drop contexts
 */
const ContentEditor = ({ data }: Props) => {
  const classes = useStyles();
  const client = useApolloClient();

  const { data: selectedComponentIdData } = useQuery<getSelectedComponentId>(
    GET_LOCAL_SELECTED_COMPONENT_ID
  );

  const { selectedComponentId = undefined } = selectedComponentIdData || {};

  const { data: selectedComponentData } = useQuery<getSelectedComponent>(
    GET_SELECTED_COMPONENT,
    {
      skip: !selectedComponentId
    }
  );

  const { component: selectedComponent = undefined } =
    selectedComponentData || {};

  const [createComponent, { loading: createLoading }] = useMutation(
    CREATE_COMPONENT
  );

  const [updateComponent, { loading: updateLoading }] = useMutation(
    UPDATE_COMPONENT
  );

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
      // Now actually fire the mutation
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
    client.writeData({ data: { selectedComponentId: null } });
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
              {createLoading || updateLoading ? <CircularProgress /> : null}
              <ComponentList components={data.components || []} level={0} />
              {provided.placeholder}
              <Settings />
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ContentEditor;
