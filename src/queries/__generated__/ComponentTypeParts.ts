/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ComponentTypeParts
// ====================================================

export interface ComponentTypeParts_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface ComponentTypeParts_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface ComponentTypeParts_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: ComponentTypeParts_childrenCount_aggregate | null;
}

export interface ComponentTypeParts {
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
  frontendWidget: ComponentTypeParts_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: ComponentTypeParts_childrenCount;
}
