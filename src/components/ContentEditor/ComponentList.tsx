import * as React from "react";
import { useQuery } from "@apollo/react-hooks";

import { List } from "@material-ui/core";

import { BaseComponentProps } from "./BaseComponent";
import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import TitleComponent from "./components/TitleComponent";
import { GET_LOCAL_SELECTED_COMPONENT_ID } from "queries/component";
import TextComponent from "./components/TextComponent";
import DefaultComponent from "./components/DefaultComponent";
import DialogComponent from "./components/Dialog/DialogComponent";

// This defines a mapping of component type names to the React Component, used then to render the content and the settings
// Originally, directly used BaseComponent here as well (for default), but this gives wierd run time errors due to circular imports
export const componentTypes: { [key: string]: any } = {
  default: DefaultComponent,
  Title: TitleComponent,
  Text: TextComponent,
  Dialog: DialogComponent
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
}

/**
 * Wrap with React Memo to avoid rerender
 */
const ComponentList = React.memo<ComponentListProps>(
  ({ level, components }) => {
    const { data: selectedComponentData } = useQuery(
      GET_LOCAL_SELECTED_COMPONENT_ID
    );

    const { selectedComponentId = undefined } = selectedComponentData || {};

    return (
      <List>
        {components.map(
          (
            component: subscribeChapterById_chapter_components,
            index: number
          ) => (
            <ComponentWrapper
              key={component.id}
              index={index}
              data={component}
              level={level}
              type={
                (component.type.frontendWidget &&
                  component.type.frontendWidget.name) ||
                component.type.name
              }
              selectedComponentId={selectedComponentId}
            />
          )
        )}
      </List>
    );
  }
);

export default ComponentList;
