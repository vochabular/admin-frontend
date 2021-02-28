/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChapterHeaderParts
// ====================================================

export interface ChapterHeaderParts_languages_language {
  __typename: "api_language";
  id: string;
  name: string;
}

export interface ChapterHeaderParts_languages {
  __typename: "api_chaptertitle";
  id: any;
  title: string;
  /**
   * An object relationship
   */
  language: ChapterHeaderParts_languages_language;
}

export interface ChapterHeaderParts_parentChapter {
  __typename: "api_chapter";
  id: any;
  number: number;
  description: string;
}

export interface ChapterHeaderParts_subChapters_components_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface ChapterHeaderParts_subChapters_components_type_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface ChapterHeaderParts_subChapters_components_type_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: ChapterHeaderParts_subChapters_components_type_childrenCount_aggregate | null;
}

export interface ChapterHeaderParts_subChapters_components_type {
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
  frontendWidget: ChapterHeaderParts_subChapters_components_type_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: ChapterHeaderParts_subChapters_components_type_childrenCount;
}

export interface ChapterHeaderParts_subChapters_components_texts_translations_language {
  __typename: "api_language";
  id: string;
}

export interface ChapterHeaderParts_subChapters_components_texts_translations {
  __typename: "api_translation";
  id: any;
  text_field: string | null;
  valid: boolean;
  /**
   * An object relationship
   */
  language: ChapterHeaderParts_subChapters_components_texts_translations_language;
}

export interface ChapterHeaderParts_subChapters_components_texts {
  __typename: "api_text";
  id: any;
  placeholder: string | null;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: ChapterHeaderParts_subChapters_components_texts_translations[];
}

export interface ChapterHeaderParts_subChapters_components_media {
  __typename: "api_media";
  id: any;
  type: string;
  url: string;
}

export interface ChapterHeaderParts_subChapters_components {
  __typename: "api_component";
  id: any;
  data: any;
  state: string;
  position: number;
  /**
   * An object relationship
   */
  type: ChapterHeaderParts_subChapters_components_type;
  /**
   * An array relationship
   */
  texts: ChapterHeaderParts_subChapters_components_texts[];
  /**
   * An array relationship
   */
  media: ChapterHeaderParts_subChapters_components_media[];
}

export interface ChapterHeaderParts_subChapters {
  __typename: "api_chapter";
  id: any;
  description: string;
  /**
   * An array relationship
   */
  components: ChapterHeaderParts_subChapters_components[];
}

export interface ChapterHeaderParts {
  __typename: "api_chapter";
  id: any;
  number: number;
  description: string;
  created: any;
  updated: any;
  disable_children: boolean;
  /**
   * An array relationship
   */
  languages: ChapterHeaderParts_languages[];
  /**
   * An object relationship
   */
  parentChapter: ChapterHeaderParts_parentChapter | null;
  /**
   * An array relationship
   */
  subChapters: ChapterHeaderParts_subChapters[];
}
