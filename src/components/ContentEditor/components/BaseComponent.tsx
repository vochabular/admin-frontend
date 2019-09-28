import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "styles";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { actions } from "reducers/contentEditorSlice";

interface Props extends WithStyles<typeof styles> {
  index: number;
  data: any;
}

const BaseComponent = ({ classes, index, data }: Props) => {
  const dispatch = useDispatch();
  const selectComponent = React.useCallback(
    () => dispatch(actions.setSelectedComponent(data)),
    [data, dispatch]
  );
  return (
    <Draggable draggableId={data.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onClick={selectComponent}
        >
          Text: {index}
        </div>
      )}
    </Draggable>
  );
};

export default withStyles(styles, { withTheme: true })(BaseComponent);
