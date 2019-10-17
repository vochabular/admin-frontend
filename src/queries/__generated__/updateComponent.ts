/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_component_set_input } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateComponent
// ====================================================

export interface updateComponent_update_api_component_returning {
  __typename: "api_component";
  id: any;
  order_in_chapter: number | null;
}

export interface updateComponent_update_api_component {
  __typename: "api_component_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: updateComponent_update_api_component_returning[];
}

export interface updateComponent {
  /**
   * update data of the table: "api_component"
   */
  update_api_component: updateComponent_update_api_component | null;
}

export interface updateComponentVariables {
  id: any;
  data: api_component_set_input;
}
