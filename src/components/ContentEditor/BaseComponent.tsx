import * as React from "react";
import classNames from "classnames";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FormikActions } from "formik";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import ComponentList from "./ComponentList";
import ComponentHeader from "./ComponentHeader";
import Text from "components/Text";
import { useApolloClient } from "@apollo/react-hooks";

export interface BaseSettingsProps {
  /**
   * A callable that should be called by Formik on submit
   */
  onSubmit: (values: any, actions: FormikActions<any>) => void;
  /**
   * Contains the value of the component's configuration values
   */
  data: string;
}

/**
 * Default that should get rendered in the settings widget
 */
export const BaseSettings = React.forwardRef<any, BaseSettingsProps>(
  (props, ref) => {
    console.warn("This component's setting widget is not yet implemented!");
    return (
      <>
        <Text>Not yet implemented!</Text>
        <Text translate={false}>Data: {props.data}</Text>
      </>
    );
  }
);

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

export interface BaseComponentProps {
  /**
   * Specifies the "depth" of the list the component belongs to
   */
  level: number;
  index: number;
  data: subscribeChapterById_chapter_components;
  preview?: React.ReactNode;
  selectedComponentId: string;
}

/**
 * Base component which is a draggable which also renders the "preview" of the component (defined in the component type's implementation)
 */
const BaseComponent = ({
  level,
  index,
  data,
  preview,
  selectedComponentId
}: BaseComponentProps) => {
  const classes = useStyles();
  const client = useApolloClient();

  const handleOnComponentClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    client.writeData({ data: { selectedComponentId: data.id } });
  };

  const isSelected = selectedComponentId === data.id || false;

  return (
    <>
      <Draggable
        draggableId={data.id}
        index={index}
        disableInteractiveElementBlocking
      >
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
            <ComponentHeader data={data} provided={provided} />
            {preview}

            {data.children.length ? (
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
            ) : null}
          </Grid>
        )}
      </Draggable>
    </>
  );
};

export default BaseComponent;
