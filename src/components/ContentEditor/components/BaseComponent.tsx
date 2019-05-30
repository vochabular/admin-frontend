import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "styles";
import { Draggable } from "react-beautiful-dnd";

interface Props extends WithStyles<typeof styles> {
  index: number;
  data: any;
}

const BaseComponent = ({ classes, index, data }: Props) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          Text: {index}
        </div>
      )}
    </Draggable>
  );
};

export default withStyles(styles, { withTheme: true })(BaseComponent);
