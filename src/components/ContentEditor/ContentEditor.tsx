import * as React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useMutation, useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ComponentSelector from "./ComponentSelector";
import { subscribeChapterById_chapter } from "queries/__generated__/subscribeChapterById";
import {
  CREATE_COMPONENT,
  GET_SELECTED_COMPONENT,
  GET_LOCAL_SELECTED_COMPONENT_ID,
  COMPONENT_PART
} from "queries/component";
import Settings from "./Settings";
import { getSelectedComponent } from "queries/__generated__/getSelectedComponent";
import { getSelectedComponentId } from "queries/__generated__/getSelectedComponentId";
import {
  createComponent as TcreateComponent,
  createComponentVariables as TcreateComponentVariables
} from "queries/__generated__/createComponent";
import {
  updateSelectedComponent as TupdateSelectedComponent,
  updateSelectedComponentVariables as TupdateSelectedComponentVariables
} from "./__generated__/updateSelectedComponent";
import ComponentListContainer from "./ComponentListContainer";

export const TOP_LEVEL_COMPONENT_TYPE = "top-level-component";
const queryAttr = "data-rbd-drag-handle-draggable-id";

const UPDATE_COMPONENT = gql`
  mutation updateSelectedComponent(
    $componentId: uuid!
    $componentData: api_component_set_input!
  ) {
    update_api_component(
      _set: $componentData
      where: { id: { _eq: $componentId } }
    ) {
      returning {
        ...ComponentParts
      }
    }
  }
  ${COMPONENT_PART}
`;

interface Props {
  data: subscribeChapterById_chapter;
}

interface PlaceholderProps {
  clientY?: any;
  clientX?: any;
  clientHeight?: any;
  clientWidth?: any;
}

/**
 * Component holding the main editor state, setting up the drag and drop contexts
 */
const ContentEditor = ({ data }: Props) => {
  const client = useApolloClient();
  const [placeholderProps, setPlaceholderProps] = React.useState<
    PlaceholderProps
  >({});

  const { data: selectedComponentIdData } = useQuery<getSelectedComponentId>(
    GET_LOCAL_SELECTED_COMPONENT_ID
  );

  const { selectedComponentId = undefined } = selectedComponentIdData || {};
  const {
    data: selectedComponentData,
    loading: selectedComponentLoading,
    error: selectedComponentError
  } = useQuery<getSelectedComponent>(GET_SELECTED_COMPONENT, {
    skip: !selectedComponentId,
    variables: { id: selectedComponentId }
  });
  const { component: selectedComponent = undefined } =
    selectedComponentData || {};

  const [createComponent, { loading: createLoading }] = useMutation<
    TcreateComponent,
    TcreateComponentVariables
  >(CREATE_COMPONENT);

  const [updateComponent, { loading: updateLoading }] = useMutation<
    TupdateSelectedComponent,
    TupdateSelectedComponentVariables
  >(UPDATE_COMPONENT);

  /**
   * Is called when the drag ends. Main function that handles all the logic related to DragAndDrop
   */
  function onDragEnd(result: DropResult) {
    setPlaceholderProps({});
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
          componentId: result.draggableId,
          componentData: {
            order_in_chapter: result.destination.index + 1
          }
        }
      });
    }
  }

  const onDragUpdate = (update: any) => {
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const clientY =
      // @ts-ignore
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      // @ts-ignore
      [...draggedDOM.parentNode.children]
        .slice(0, destinationIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        // @ts-ignore
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      )
    });
  };

  const handleClickAway = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    client.writeData({ data: { selectedComponentId: null } });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <ComponentSelector
          selectedComponent={selectedComponent || undefined}
          loading={selectedComponentLoading}
          error={selectedComponentError}
        />
        {/* This is the "top-level" droppable area. Note that draggables can only be dropped within a droppable with the same type! */}
        <ComponentListContainer
          onClickAway={handleClickAway}
          placeholderProps={placeholderProps}
          loading={createLoading || updateLoading}
          components={(data && data.components) || []}
        />
      </DragDropContext>
      <Settings
        loading={selectedComponentLoading}
        component={selectedComponent || undefined}
        languages={selectedComponentData && selectedComponentData.languages}
      />
    </>
  );
};

export default React.memo(ContentEditor);
