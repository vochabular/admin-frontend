/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDataOfDialog
// ====================================================

export interface getDataOfDialog_component_bubble_dialog {
  __typename: "api_component";
  id: any;
  characters: any;
}

export interface getDataOfDialog_component_bubble {
  __typename: "api_component";
  id: any;
  /**
   * An object relationship
   */
  dialog: getDataOfDialog_component_bubble_dialog | null;
}

export interface getDataOfDialog_component {
  __typename: "api_component";
  id: any;
  /**
   * An object relationship
   */
  bubble: getDataOfDialog_component_bubble | null;
}

export interface getDataOfDialog {
  /**
   * fetch data from the table: "api_component" using primary key columns
   */
  component: getDataOfDialog_component | null;
}

export interface getDataOfDialogVariables {
  id: any;
}
