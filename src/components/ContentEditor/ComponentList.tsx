import * as React from "react";

import BaseComponent from "./components/BaseComponent";

/**
 * Wrap with React Memo to avoid rerender
 */
const ComponentList = React.memo(function ComponentList({ components }: any) {
  console.log(components);
  return components.map((component: any, index: number) => (
    <BaseComponent key={component.id} index={index} data={component} />
  ));
});

export default ComponentList;
