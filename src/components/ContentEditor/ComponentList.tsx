import * as React from "react";

import { List } from "@material-ui/core";

import BaseComponent, { BaseComponentProps } from "./BaseComponent";
import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import TitleComponent from "./components/TitleComponent";
import { useQuery } from "@apollo/react-hooks";
import { GET_LOCAL_SELECTED_COMPONENT_ID } from "queries/component";

// This defines a mapping of component type names to the React Component, used then to render the content and the settings
export const componentTypes: { [key: string]: any } = {
  default: BaseComponent,
  Title: TitleComponent,
  Text: BaseComponent,
  Dialogue: BaseComponent
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

    const { selectedComponentId } = selectedComponentData;

    return (
      <List style={{ flex: 1 }}>
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
              type={component.type.name}
              selectedComponentId={selectedComponentId}
            />
          )
        )}
      </List>
    );
  }
);

export default ComponentList;
