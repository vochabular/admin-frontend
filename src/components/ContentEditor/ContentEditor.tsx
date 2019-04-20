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
import BaseComponent from "./components/BaseComponent";

/**
 * Wrap with React Memo to avoid rerender
 */
const ComponentList = React.memo(function ComponentList({ components }: any) {
  return components.map((component: any, index: number) => (
    <BaseComponent key={component.id} index={index} data={component} />
  ));
});

interface Props extends WithStyles<typeof styles> {}

const ContentEditor = ({ classes }: Props) => {
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ComponentList
              components={[
                { id: 1, data: "TEST 1" },
                { id: 2, data: "TEST 2" }
              ]}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default withStyles(styles, { withTheme: true })(ContentEditor);
