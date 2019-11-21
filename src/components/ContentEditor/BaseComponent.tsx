import * as React from "react";
import classNames from "classnames";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useApolloClient } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import ComponentList from "./ComponentList";
import ComponentHeader from "./ComponentHeader";
import Text from "components/Text";
import { getSelectedComponent_component } from "queries/__generated__/getSelectedComponent";
import { SubmitConfig } from "./Settings";
import Dropzone from "./Dropzone";

export interface BaseSettingsProps {
  /**
   * A callable that should be called by Formik on submit
   */
  onSubmit: (config: SubmitConfig) => void;
  /**
   * The selected component
   */
  data: getSelectedComponent_component;
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
        <Text translate={false}>Data: {props.data.data}</Text>
      </>
    );
  }
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
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
  const color = `#${Math.floor(
    Math.abs(Math.sin(level + 12) * 16777215) % 16777215
  ).toString(16)}`;

  const childrenList = (
    <ComponentList components={data.children} level={level + 1} />
  );

  return (
    <>
      <Draggable
        draggableId={data.id}
        index={index}
        disableInteractiveElementBlocking
      >
        {(provided, snapshot) => (
          <Grid
            item
            container
            alignItems="stretch"
            ref={provided.innerRef}
            spacing={1}
            className={classNames(
              classes.container,
              isSelected && classes.selected
            )}
            onClick={handleOnComponentClick}
            {...provided.draggableProps}
          >
            <ComponentHeader data={data} provided={provided} />
            {preview}
            <Droppable
              droppableId={`component-list-${data.id}`}
              type={`${data.type.name}-${data.id}`}
            >
              {(provided, snapshot) => (
                <Grid
                  item
                  container
                  alignItems="stretch"
                  direction="column"
                  ref={provided.innerRef}
                  style={{
                    // padding: 20,
                    flexGrow: 1
                  }}
                  {...provided.droppableProps}
                >
                  {childrenList}
                  {/* TODO(df): Only display placeholder if component is selected*/}
                  {isSelected && provided.placeholder && (
                    <Grid item>
                      <Dropzone color={color} />
                    </Grid>
                  )}
                  <div style={{ display: "none" }}>{provided.placeholder}</div>
                </Grid>
              )}
            </Droppable>
          </Grid>
        )}
      </Draggable>
    </>
  );
};

export default BaseComponent;
