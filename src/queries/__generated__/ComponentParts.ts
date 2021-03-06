/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ComponentParts
// ====================================================

export interface ComponentParts_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface ComponentParts_type_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface ComponentParts_type_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: ComponentParts_type_childrenCount_aggregate | null;
}

export interface ComponentParts_type {
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
  frontendWidget: ComponentParts_type_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: ComponentParts_type_childrenCount;
}

export interface ComponentParts_texts_translations_language {
  __typename: "api_language";
  id: string;
}

export interface ComponentParts_texts_translations {
  __typename: "api_translation";
  id: any;
  text_field: string | null;
  valid: boolean;
  /**
   * An object relationship
   */
  language: ComponentParts_texts_translations_language;
}

export interface ComponentParts_texts {
  __typename: "api_text";
  id: any;
  placeholder: string | null;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: ComponentParts_texts_translations[];
}

export interface ComponentParts_media {
  __typename: "api_media";
  id: any;
  type: string;
  url: string;
}

export interface ComponentParts {
  __typename: "api_component";
  id: any;
  data: any;
  state: string;
  position: number;
  /**
   * An object relationship
   */
  type: ComponentParts_type;
  /**
   * An array relationship
   */
  texts: ComponentParts_texts[];
  /**
   * An array relationship
   */
  media: ComponentParts_media[];
}
