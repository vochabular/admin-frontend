/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_component_insert_input } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createComponent
// ====================================================

export interface createComponent_insert_api_component_returning {
  __typename: "api_component";
  id: any;
}

export interface createComponent_insert_api_component {
  __typename: "api_component_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: createComponent_insert_api_component_returning[];
}

export interface createComponent {
  /**
   * insert data into the table: "api_component"
   */
  insert_api_component: createComponent_insert_api_component | null;
}

export interface createComponentVariables {
  input: api_component_insert_input;
}
