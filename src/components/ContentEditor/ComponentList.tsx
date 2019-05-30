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

export default ComponentList;
