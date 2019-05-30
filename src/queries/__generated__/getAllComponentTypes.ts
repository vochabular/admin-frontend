/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllComponentTypes
// ====================================================

export interface getAllComponentTypes_componentTypes {
  __typename: "ComponentTypeType";
  id: string;
  name: string;
  schema: string;
}

export interface getAllComponentTypes {
  componentTypes: (getAllComponentTypes_componentTypes | null)[] | null;
}
