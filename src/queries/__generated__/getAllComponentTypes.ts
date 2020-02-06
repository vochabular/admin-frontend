/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllComponentTypes
// ====================================================

export interface getAllComponentTypes_types_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface getAllComponentTypes_types_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface getAllComponentTypes_types_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: getAllComponentTypes_types_childrenCount_aggregate | null;
}

export interface getAllComponentTypes_types {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
  base: boolean;
  schema: any;
  created: any;
  updated: any;
  /**
   * An object relationship
   */
  frontendWidget: getAllComponentTypes_types_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: getAllComponentTypes_types_childrenCount;
}

export interface getAllComponentTypes {
  /**
   * fetch data from the table: "api_componenttype"
   */
  types: getAllComponentTypes_types[];
}
