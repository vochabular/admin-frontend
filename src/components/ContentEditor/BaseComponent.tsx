import * as React from "react";
import classNames from "classnames";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useApolloClient } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import ComponentList from "./ComponentList";
import ComponentHeader from "./ComponentHeader";
import Text from "components/Text";
import { getSelectedComponent_component } from "queries/__generated__/getSelectedComponent";
import { SubmitConfig } from "./Settings";
import ComponentBody from "./ComponentBody";
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

interface StyleProps {
  level: number;
  isSelected: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: (props: StyleProps) => ({
    backgroundColor:
      // @ts-ignore
      theme.palette.grey[(props.level + 4) * 100] || theme.palette.grey[100],
    border: "solid",
    borderWidth: 2,
    marginBottom: theme.spacing(2),
    borderColor: props.isSelected ? theme.palette.primary.light : "inherit",
  }),
}));

export interface BaseComponentProps {
  /**
   * Specifies the "depth" of the list the component belongs to
   */
  level: number;
  index: number;
  data: subscribeChapterById_chapter_components;
  /**
   * Can be used to pass the generic "data" property of the component down to the children (for context)
   */
  childrenData?: any;
  preview?: React.ReactNode;
  body?: React.ReactNode;
  selectedComponentId: string;
  /**
   * If true the children list will be rendered inline without a list
   */
  renderChildrenInline?: boolean;
  /**
   * If true, the component will render in a compact form (without flex 1)
   */
  renderCompact?: boolean;
}

/**
 * Base component which is a draggable which also renders the "preview" of the component (defined in the component type's implementation)
 */
const BaseComponent = ({
  level,
  index,
  data,
  childrenData,
  preview,
  body,
  selectedComponentId,
  renderChildrenInline,
  renderCompact = false,
}: BaseComponentProps) => {
  const isSelected = selectedComponentId === data.id || false;
  const classes = useStyles({ level, isSelected });
  const client = useApolloClient();

  const handleOnComponentClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    client.writeData({ data: { selectedComponentId: data.id } });
  };
  const color = `#${Math.floor(
    Math.abs(Math.sin(level + 12) * 16777215) % 16777215
  ).toString(16)}`;

  const childrenList = (
    <ComponentList
      components={data.children}
      level={level + 1}
      renderChildrenInline={renderChildrenInline}
      childrenData={childrenData}
    />
  );

  if (renderCompact) {
    return <div onClick={handleOnComponentClick}>{body}</div>;
  }

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
            className={classNames([classes.container])}
            onClick={handleOnComponentClick}
            {...provided.draggableProps}
          >
            <ComponentHeader
              data={data}
              provided={provided}
              preview={preview}
            />
            <ComponentBody content={body} />
            <Droppable
              droppableId={`component-list-${data.id}`}
              type={`${data.type.name}-${data.id}`}
            >
              {(provided, snapshot) => (
                <Grid
                  ref={provided.innerRef}
                  style={{
                    paddingLeft: data.children.length && 20,
                    paddingRight: data.children.length && 20,
                    paddingBottom: data.children.length && 20,
                    flex: 1,
                    // display: "none"
                  }}
                  {...provided.droppableProps}
                >
                  {childrenList}
                  {isSelected &&
                    provided.placeholder &&
                    !!data.type.childrenCount.aggregate?.count && (
                      <Grid item>
                        <Dropzone color={color} />
                      </Grid>
                    )}
                  <div>{provided.placeholder}</div>
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
