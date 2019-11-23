/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_component_set_input } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateSelectedComponent
// ====================================================

export interface updateSelectedComponent_update_api_component_returning_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface updateSelectedComponent_update_api_component_returning_type {
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
  frontendWidget: updateSelectedComponent_update_api_component_returning_type_frontendWidget | null;
}

export interface updateSelectedComponent_update_api_component_returning_texts_translations_language {
  __typename: "api_language";
  id: string;
}

export interface updateSelectedComponent_update_api_component_returning_texts_translations {
  __typename: "api_translation";
  id: any;
  text_field: string;
  valid: boolean;
  /**
   * An object relationship
   */
  language: updateSelectedComponent_update_api_component_returning_texts_translations_language;
}

export interface updateSelectedComponent_update_api_component_returning_texts {
  __typename: "api_text";
  id: any;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: updateSelectedComponent_update_api_component_returning_texts_translations[];
}

export interface updateSelectedComponent_update_api_component_returning_media {
  __typename: "api_media";
  id: any;
}

export interface updateSelectedComponent_update_api_component_returning {
  __typename: "api_component";
  id: any;
  data: any;
  state: string;
  position: number;
  /**
   * An object relationship
   */
  type: updateSelectedComponent_update_api_component_returning_type;
  /**
   * An array relationship
   */
  texts: updateSelectedComponent_update_api_component_returning_texts[];
  /**
   * An array relationship
   */
  media: updateSelectedComponent_update_api_component_returning_media[];
}

export interface updateSelectedComponent_update_api_component {
  __typename: "api_component_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: updateSelectedComponent_update_api_component_returning[];
}

export interface updateSelectedComponent {
  /**
   * update data of the table: "api_component"
   */
  update_api_component: updateSelectedComponent_update_api_component | null;
}

export interface updateSelectedComponentVariables {
  componentId: any;
  componentData: api_component_set_input;
}
