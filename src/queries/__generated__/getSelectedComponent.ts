/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSelectedComponent
// ====================================================

export interface getSelectedComponent_component_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface getSelectedComponent_component_type_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface getSelectedComponent_component_type_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: getSelectedComponent_component_type_childrenCount_aggregate | null;
}

export interface getSelectedComponent_component_type {
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
  frontendWidget: getSelectedComponent_component_type_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: getSelectedComponent_component_type_childrenCount;
}

export interface getSelectedComponent_component_texts_translations_language {
  __typename: "api_language";
  id: string;
}

export interface getSelectedComponent_component_texts_translations {
  __typename: "api_translation";
  id: any;
  text_field: string | null;
  valid: boolean;
  /**
   * An object relationship
   */
  language: getSelectedComponent_component_texts_translations_language;
}

export interface getSelectedComponent_component_texts {
  __typename: "api_text";
  id: any;
  placeholder: string | null;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: getSelectedComponent_component_texts_translations[];
}

export interface getSelectedComponent_component_media {
  __typename: "api_media";
  id: any;
  type: string;
  url: string;
}

export interface getSelectedComponent_component {
  __typename: "api_component";
  id: any;
  data: any;
  state: string;
  position: number;
  /**
   * An object relationship
   */
  type: getSelectedComponent_component_type;
  /**
   * An array relationship
   */
  texts: getSelectedComponent_component_texts[];
  /**
   * An array relationship
   */
  media: getSelectedComponent_component_media[];
}

export interface getSelectedComponent_languages {
  __typename: "api_language";
  id: string;
  name: string;
}

export interface getSelectedComponent {
  /**
   * fetch data from the table: "api_component" using primary key columns
   */
  component: getSelectedComponent_component | null;
  /**
   * fetch data from the table: "api_language"
   */
  languages: getSelectedComponent_languages[];
}

export interface getSelectedComponentVariables {
  id: any;
}
