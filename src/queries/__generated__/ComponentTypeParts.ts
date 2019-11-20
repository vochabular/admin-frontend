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
}
