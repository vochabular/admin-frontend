/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllComponentTypes
// ====================================================

export interface getAllComponentTypes_types {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
  base: boolean;
  schema: string;
  created: any;
  updated: any;
}

export interface getAllComponentTypes {
  /**
   * fetch data from the table: "api_componenttype"
   */
  types: getAllComponentTypes_types[];
}
