import * as React from "react";
import { useQuery } from "@apollo/react-hooks";

import { List, Box } from "@material-ui/core";

import { BaseComponentProps } from "./BaseComponent";
import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import TitleComponent from "./components/TitleComponent";
import { GET_LOCAL_SELECTED_COMPONENT_ID } from "queries/component";
import TextComponent from "./components/TextComponent";
import DefaultComponent from "./components/DefaultComponent";
import DialogComponent from "./components/Dialog/DialogComponent";
import BubbleComponent from "./components/Dialog/BubbleComponent";
import BubbleItemComponent from "./components/Dialog/BubbleItemComponent";

// This defines a mapping of component type names to the React Component, used then to render the content and the settings
// Originally, directly used BaseComponent here as well (for default), but this gives wierd run time errors due to circular imports
export const componentTypes: { [key: string]: any } = {
  default: DefaultComponent,
  Title: TitleComponent,
  Text: TextComponent,
  Dialog: DialogComponent,
  Bubble: BubbleComponent,
  BubbleItem: BubbleItemComponent,
};

interface ComponentWrapperProps {
  /**
   * The name of the component type as defined on the backend and added in the componentTypes mapping above
   */
  type: string;
}

const ComponentWrapper = ({
  type,
  ...otherProps
}: ComponentWrapperProps & BaseComponentProps) => {
  const Component = componentTypes[type] || componentTypes.default;
  return <Component {...otherProps} />;
};

interface ComponentListProps {
  /**
   * Specifies the depth the list resides, i.e. for top-level components it is 0
   */
  level: number;
  /**
   * An array of components
   */
  components: any; // TODO(df): Improve typing: Somehow there is a bug and can't use: subscribeChapterById_chapter_components[];
  /**
   * Flag if the component should be rendered inline (not in a list)
   */
  renderChildrenInline?: boolean;
  /**
   * An optional children data type used to pass the generic data property down to the children. Can be anything (BAD! Don't shoot me!)
   */
  childrenData?: any;
}

/**
 * Wrap with React Memo to avoid rerender
 */
const ComponentList = React.memo<ComponentListProps>(
  ({ level, components, renderChildrenInline, childrenData }) => {
    const { data: selectedComponentData } = useQuery(
      GET_LOCAL_SELECTED_COMPONENT_ID
    );

    const { selectedComponentId = undefined } = selectedComponentData || {};

    const children = components.map(
      (component: subscribeChapterById_chapter_components, index: number) => (
        <ComponentWrapper
          key={component.id}
          index={index}
          data={component}
          childrenData={childrenData}
          level={level}
          type={
            (component.type.frontendWidget &&
              component.type.frontendWidget.name) ||
            component.type.name
          }
          selectedComponentId={selectedComponentId}
          renderCompact={renderChildrenInline}
        />
      )
    );

    if (renderChildrenInline)
      return (
        <Box display="flex" flexWrap="wrap">
          {children}
        </Box>
      );
    return <List>{children}</List>;
  }
);

export default ComponentList;
