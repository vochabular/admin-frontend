/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ComponentParts
// ====================================================

export interface ComponentParts_type {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
  base: boolean;
  schema: string;
  created: any;
  updated: any;
}

export interface ComponentParts_texts_translations_language {
  __typename: "api_language";
  id: any;
  code: string;
}

export interface ComponentParts_texts_translations {
  __typename: "api_translation";
  id: any;
  textField: string;
  /**
   * An object relationship
   */
  language: ComponentParts_texts_translations_language;
}

export interface ComponentParts_texts {
  __typename: "api_text";
  id: any;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: ComponentParts_texts_translations[];
}

export interface ComponentParts_media {
  __typename: "api_media";
  id: any;
}

export interface ComponentParts {
  __typename: "api_component";
  id: any;
  data: string;
  state: string;
  position: number | null;
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
