import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "styles";
import ComponentList from "./ComponentList";
import ComponentSelector from "./ComponentSelector";

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
  /*
  const [selectedParentComponet, setSelectedParentComponent] = React.useState(
    undefined
  );
  */

  // TODO: What kind of state do we have to initialize here?
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="component-list" type="component-list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ComponentSelector />
              <ComponentList components={data.components} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(ContentEditor);
