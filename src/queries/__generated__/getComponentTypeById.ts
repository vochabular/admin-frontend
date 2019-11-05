/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getComponentTypeById
// ====================================================

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
