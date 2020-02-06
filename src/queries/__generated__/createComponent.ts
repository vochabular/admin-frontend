/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_component_insert_input } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createComponent
// ====================================================

export interface createComponent_insert_api_component_returning_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface createComponent_insert_api_component_returning_type_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface createComponent_insert_api_component_returning_type_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: createComponent_insert_api_component_returning_type_childrenCount_aggregate | null;
}

export interface createComponent_insert_api_component_returning_type {
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
  frontendWidget: createComponent_insert_api_component_returning_type_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: createComponent_insert_api_component_returning_type_childrenCount;
}

export interface createComponent_insert_api_component_returning_texts_translations_language {
  __typename: "api_language";
  id: string;
}

export interface createComponent_insert_api_component_returning_texts_translations {
  __typename: "api_translation";
  id: any;
  text_field: string;
  valid: boolean;
  /**
   * An object relationship
   */
  language: createComponent_insert_api_component_returning_texts_translations_language;
}

export interface createComponent_insert_api_component_returning_texts {
  __typename: "api_text";
  id: any;
  placeholder: string | null;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: createComponent_insert_api_component_returning_texts_translations[];
}

export interface createComponent_insert_api_component_returning_media {
  __typename: "api_media";
  id: any;
}

export interface createComponent_insert_api_component_returning {
  __typename: "api_component";
  id: any;
  data: any;
  state: string;
  position: number;
  /**
   * An object relationship
   */
  type: createComponent_insert_api_component_returning_type;
  /**
   * An array relationship
   */
  texts: createComponent_insert_api_component_returning_texts[];
  /**
   * An array relationship
   */
  media: createComponent_insert_api_component_returning_media[];
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
