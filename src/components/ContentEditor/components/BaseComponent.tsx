import * as React from "react";
import classNames from "classnames";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { Grid, ClickAwayListener } from "@material-ui/core";

import { actions, IContentEditorState } from "reducers/contentEditorSlice";
import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import ComponentList from "../ComponentList";
import { TAppState } from "reducers";
import ComponentHeader from "./ComponentHeader";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    border: "solid",
    borderWidth: 2,
    borderColor: theme.palette.grey[200],
    marginBottom: theme.spacing(2)
  },
  selected: {
    borderColor: theme.palette.primary.light
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
    event.preventDefault();
    selectComponent();
    // handle
  };

  const handleClickAway = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    unselectComponent();
  };

  return (
    <Draggable
      draggableId={data.id}
      index={index}
      disableInteractiveElementBlocking
    >
      {(provided, snapshot) => (
        <ClickAwayListener onClickAway={handleClickAway}>
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
            <ComponentHeader data={data} provided={provided} />

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
                    <ComponentList
                      components={data.children}
                      level={level + 1}
                    />
                    {provided.placeholder}
                  </Grid>
                )}
              </Droppable>
            ) : //</Grid>
            null}
          </Grid>
        </ClickAwayListener>
      )}
    </Draggable>
  );
};

export default BaseComponent;
