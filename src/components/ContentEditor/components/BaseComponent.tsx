import * as React from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { DragHandle, Clear } from "@material-ui/icons";
import { IconButton, Icon, Typography, Grid } from "@material-ui/core";

import { styles } from "styles";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { actions, IContentEditorState } from "reducers/contentEditorSlice";
import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import ComponentList from "../ComponentList";
import { TAppState } from "reducers";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    border: "solid",
    borderWidth: 2,
    borderColor: theme.palette.grey[200],
    marginBottom: theme.spacing(2)
  },
  selected: {
    borderColor: "red"
  }
}));

interface Props {
  /**
   * Specifies the "depth" of the list the component belongs to
   */
  level: number;
  index: number;
  data: subscribeChapterById_chapter_components;
}

const BaseComponent = ({ level, index, data }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedComponent } = useSelector<TAppState, IContentEditorState>(
    state => state.contentEditor
  );
  const selectComponent = React.useCallback(
    () => dispatch(actions.setSelectedComponent(data)),
    [data, dispatch]
  );

  const unselectComponent = React.useCallback(
    () => dispatch(actions.setSelectedComponent()),
    [dispatch]
  );

  const isSelected =
    (selectedComponent && selectedComponent.id === data.id) || false;

  const handleOnComponentClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    selectComponent();
  };

  const handleOnComponentUnselectClick = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    unselectComponent();
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <Grid
          container
          direction="row"
          alignItems="stretch"
          ref={provided.innerRef}
          spacing={1}
          {...provided.draggableProps}
          className={classNames(
            classes.container,
            isSelected && classes.selected
          )}
          onClick={handleOnComponentClick}
        >
          <Grid item container spacing={1} xs={12} justify="space-between">
            <IconButton {...provided.dragHandleProps}>
              <DragHandle />
            </IconButton>
            <Icon>{data.type.icon}</Icon>
            <Typography>{data.data}</Typography>
            {isSelected ? (
              <IconButton onClick={handleOnComponentUnselectClick}>
                <Clear />
              </IconButton>
            ) : null}
          </Grid>

          {data.children.length ? (
            // <Grid item container style={{ padding: 16 }} alignItems="stretch">
            <Droppable
              droppableId={`component-list-${data.id}`}
              type={`${data.type.name}-${data.id}`}
            >
              {(provided, snapshot) => (
                <Grid
                  item
                  container
                  alignItems="stretch"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ padding: 20 }}
                >
                  <ComponentList components={data.children} level={level + 1} />
                </Grid>
              )}
            </Droppable>
          ) : //</Grid>
          null}
        </Grid>
      )}
    </Draggable>
  );
};

export default BaseComponent;
