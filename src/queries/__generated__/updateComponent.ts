/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_component_set_input, api_text_insert_input, api_text_update_column } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateComponent
// ====================================================

export interface updateComponent_update_api_component_returning {
  __typename: "api_component";
  id: any;
  order_in_chapter: number | null;
  data: any;
}

export interface updateComponent_update_api_component {
  __typename: "api_component_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: updateComponent_update_api_component_returning[];
}

export interface updateComponent_insert_api_text {
  __typename: "api_text_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface updateComponent_delete_api_text {
  __typename: "api_text_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface updateComponent_delete_api_translation {
  __typename: "api_translation_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface updateComponent {
  /**
   * update data of the table: "api_component"
   */
  update_api_component: updateComponent_update_api_component | null;
  /**
   * insert data into the table: "api_text"
   */
  insert_api_text: updateComponent_insert_api_text | null;
  /**
   * delete data from the table: "api_text"
   */
  delete_api_text: updateComponent_delete_api_text | null;
  /**
   * delete data from the table: "api_translation"
   */
  delete_api_translation: updateComponent_delete_api_translation | null;
}

export interface updateComponentVariables {
  componentId: any;
  componentData: api_component_set_input;
  textData: api_text_insert_input;
  textUpdateColumns: api_text_update_column[];
  deleteTextIds: any[];
  deleteTranslationIds: any[];
}
