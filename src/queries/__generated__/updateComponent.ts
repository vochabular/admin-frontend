/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { api_component_set_input, api_text_insert_input, api_text_update_column, api_translation_insert_input, api_translation_update_column, api_media_insert_input, api_media_update_column } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateComponent
// ====================================================

export interface updateComponent_update_api_component_returning_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface updateComponent_update_api_component_returning_type_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface updateComponent_update_api_component_returning_type_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: updateComponent_update_api_component_returning_type_childrenCount_aggregate | null;
}

export interface updateComponent_update_api_component_returning_type {
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
  frontendWidget: updateComponent_update_api_component_returning_type_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: updateComponent_update_api_component_returning_type_childrenCount;
}

export interface updateComponent_update_api_component_returning_texts_translations_language {
  __typename: "api_language";
  id: string;
}

export interface updateComponent_update_api_component_returning_texts_translations {
  __typename: "api_translation";
  id: any;
  text_field: string | null;
  valid: boolean;
  /**
   * An object relationship
   */
  language: updateComponent_update_api_component_returning_texts_translations_language;
}

export interface updateComponent_update_api_component_returning_texts {
  __typename: "api_text";
  id: any;
  placeholder: string | null;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: updateComponent_update_api_component_returning_texts_translations[];
}

export interface updateComponent_update_api_component_returning_media {
  __typename: "api_media";
  id: any;
  type: string;
  url: string;
}

export interface updateComponent_update_api_component_returning {
  __typename: "api_component";
  id: any;
  data: any;
  state: string;
  position: number;
  /**
   * An object relationship
   */
  type: updateComponent_update_api_component_returning_type;
  /**
   * An array relationship
   */
  texts: updateComponent_update_api_component_returning_texts[];
  /**
   * An array relationship
   */
  media: updateComponent_update_api_component_returning_media[];
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

export interface updateComponent_insert_api_translation {
  __typename: "api_translation_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface updateComponent_insert_api_media {
  __typename: "api_media_mutation_response";
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

export interface updateComponent_delete_api_media {
  __typename: "api_media_mutation_response";
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
   * insert data into the table: "api_translation"
   */
  insert_api_translation: updateComponent_insert_api_translation | null;
  /**
   * insert data into the table: "api_media"
   */
  insert_api_media: updateComponent_insert_api_media | null;
  /**
   * delete data from the table: "api_text"
   */
  delete_api_text: updateComponent_delete_api_text | null;
  /**
   * delete data from the table: "api_translation"
   */
  delete_api_translation: updateComponent_delete_api_translation | null;
  /**
   * delete data from the table: "api_media"
   */
  delete_api_media: updateComponent_delete_api_media | null;
}

export interface updateComponentVariables {
  componentId: any;
  componentData: api_component_set_input;
  textData: api_text_insert_input[];
  textUpdateColumns: api_text_update_column[];
  translationData: api_translation_insert_input[];
  translationUpdateColumns: api_translation_update_column[];
  mediaData: api_media_insert_input[];
  mediaUpdateColumns: api_media_update_column[];
  deleteTextIds: any[];
  deleteTranslationIds: any[];
  deleteMediaIds: any[];
}
