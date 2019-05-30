/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllComponentTypes
// ====================================================

export interface getAllComponentTypes_componentTypes_edges_node {
  __typename: "ComponentTypeType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  schema: string;
}

export interface getAllComponentTypes_componentTypes_edges {
  __typename: "ComponentTypeTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getAllComponentTypes_componentTypes_edges_node | null;
}

export interface getAllComponentTypes_componentTypes {
  __typename: "ComponentTypeTypeConnection";
  edges: (getAllComponentTypes_componentTypes_edges | null)[];
}

export interface getAllComponentTypes {
  componentTypes: getAllComponentTypes_componentTypes | null;
}
