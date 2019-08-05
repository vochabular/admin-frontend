import * as React from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/styles";
import { withStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { DragHandle } from "@material-ui/icons";
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
    borderWidth: 3,
    borderColor: theme.palette.grey[200]
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

  const isSelected =
    (selectedComponent && selectedComponent.id === data.id) || false;

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <Grid
          container
          direction="row"
          alignItems="stretch"
          ref={provided.innerRef}
          // spacing={2}
          {...provided.draggableProps}
          className={classNames(
            classes.container,
            isSelected && classes.selected
          )}
        >
          <Grid
            item
            container
            //alignItems="stretch"
            justify="space-between"
          >
            <IconButton {...provided.dragHandleProps} onClick={selectComponent}>
              <DragHandle />
            </IconButton>
            <Icon>{data.type.icon}</Icon>
            <Typography>{data.data}</Typography>
          </Grid>

          {data.children.length ? (
            <Grid item>
              <Droppable
                droppableId={`component-list-${data.id}`}
                type={`${data.type.name}-${data.id}`}
              >
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <ComponentList
                      components={data.children}
                      level={level + 1}
                    />
                  </div>
                )}
              </Droppable>
            </Grid>
          ) : null}
        </Grid>
      )}
    </Draggable>
  );
};

export default BaseComponent;
