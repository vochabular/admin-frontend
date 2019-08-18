/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSelectedComponent
// ====================================================

export interface getSelectedComponent_component_type {
  __typename: "api_componenttype";
  id: any;
  name: string;
  icon: string;
}

export interface getSelectedComponent_component_texts_translations {
  __typename: "api_translation";
  id: any;
  textField: string;
}

export interface getSelectedComponent_component_texts {
  __typename: "api_text";
  id: any;
  /**
   * An array relationship
   */
  translations: getSelectedComponent_component_texts_translations[];
}

export interface getSelectedComponent_component {
  __typename: "api_component";
  id: any;
  data: string;
  state: string;
  position: number | null;
  /**
   * An object relationship
   */
  type: getSelectedComponent_component_type;
  /**
   * An array relationship
   */
  texts: getSelectedComponent_component_texts[];
}

export interface getSelectedComponent {
  selectedComponentId: any;
  /**
   * fetch data from the table: "api_component" using primary key columns
   */
  component: getSelectedComponent_component | null;
}

export interface getSelectedComponentVariables {
  id: any;
}
