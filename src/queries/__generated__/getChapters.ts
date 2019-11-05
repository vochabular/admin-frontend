/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getChapters
// ====================================================

export interface getChapters_chapters_parentChapter {
  __typename: "api_chapter";
  id: any;
  number: number;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface getChapters_chapters_subChapters {
  __typename: "api_chapter";
  id: any;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface getChapters_chapters_components_type {
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

export interface getChapters_chapters_components_texts_translations_language {
  __typename: "api_language";
  id: any;
  code: string;
}

export interface getChapters_chapters_components_texts_translations {
  __typename: "api_translation";
  id: any;
  textField: string;
  /**
   * An object relationship
   */
  language: getChapters_chapters_components_texts_translations_language;
}

export interface getChapters_chapters_components_texts {
  __typename: "api_text";
  id: any;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: getChapters_chapters_components_texts_translations[];
}

export interface getChapters_chapters_components_media {
  __typename: "api_media";
  id: any;
}

export interface getChapters_chapters_components {
  __typename: "api_component";
  id: any;
  data: string;
  state: string;
  position: number | null;
  /**
   * An object relationship
   */
  type: getChapters_chapters_components_type;
  /**
   * An array relationship
   */
  texts: getChapters_chapters_components_texts[];
  /**
   * An array relationship
   */
  media: getChapters_chapters_components_media[];
}

export interface getChapters_chapters {
  __typename: "api_chapter";
  id: any;
  number: number;
  titleCH: string;
  titleDE: string;
  description: string;
  created: any;
  updated: any;
  /**
   * An object relationship
   */
  parentChapter: getChapters_chapters_parentChapter | null;
  /**
   * An array relationship
   */
  subChapters: getChapters_chapters_subChapters[];
  /**
   * An array relationship
   */
  components: getChapters_chapters_components[];
}

export interface getChapters {
  /**
   * fetch data from the table: "api_chapter"
   */
  chapters: getChapters_chapters[];
}
