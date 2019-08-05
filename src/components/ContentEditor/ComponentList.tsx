import * as React from "react";

import { List, ListSubheader } from "@material-ui/core";

import BaseComponent from "./components/BaseComponent";
import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";

interface Props {
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
const ComponentList = React.memo<Props>(({ level, components }) => {
  return (
    <List>
      {/* TODO(df): Extract logic into this componentHeader */}
      {/*<ComponentHeader /> */}
      {components.map(
        (component: subscribeChapterById_chapter_components, index: number) => (
          <BaseComponent
            key={component.id}
            index={index}
            data={component}
            level={level}
          />
        )
      )}
    </List>
  );
});

export default ComponentList;
