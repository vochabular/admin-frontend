/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getComponentTypeById
// ====================================================

export interface getComponentTypeById_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface getComponentTypeById_type_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface getComponentTypeById_type_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: getComponentTypeById_type_childrenCount_aggregate | null;
}

export interface getComponentTypeById_type_children_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface getComponentTypeById_type_children_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface getComponentTypeById_type_children_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: getComponentTypeById_type_children_childrenCount_aggregate | null;
}

export interface getComponentTypeById_type_children {
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
  frontendWidget: getComponentTypeById_type_children_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: getComponentTypeById_type_children_childrenCount;
}

export interface getComponentTypeById_type {
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
  frontendWidget: getComponentTypeById_type_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: getComponentTypeById_type_childrenCount;
  /**
   * An array relationship
   */
  children: getComponentTypeById_type_children[];
}

export interface getComponentTypeById {
  /**
   * fetch data from the table: "api_componenttype" using primary key columns
   */
  type: getComponentTypeById_type | null;
}

export interface getComponentTypeByIdVariables {
  id: any;
}
