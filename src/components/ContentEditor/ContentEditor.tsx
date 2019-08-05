import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "styles";
import ComponentList from "./ComponentList";
import ComponentSelector from "./ComponentSelector";
import { subscribeChapterById_chapter } from "queries/__generated__/subscribeChapterById";

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

interface Props extends WithStyles<typeof styles> {
  data: subscribeChapterById_chapter;
}

const ContentEditor = ({ classes, data }: Props) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="component-selector"
        type="component-selector" //TODO(df): Needs to be "dynamic". Either the (top-level) component selector, or else the actual components type + uuid, since it should only be droppable over the current selected component!
        isDropDisabled
        direction="horizontal"
      >
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ComponentSelector />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="component-list" type="component-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ComponentList components={data.components || []} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default withStyles(styles, { withTheme: true })(ContentEditor);
