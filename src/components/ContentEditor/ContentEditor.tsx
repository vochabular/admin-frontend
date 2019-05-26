import * as React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "src/styles";
import theme from "src/theme";
import ComponentList from "./ComponentList";

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
  data: any;
}

const ContentEditor = ({ classes, data }: Props) => {
  // TODO: What kind of state do we have to initialize here?
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="component-list" type="component-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ComponentList components={data.components} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default withStyles(styles, { withTheme: true })(ContentEditor);
