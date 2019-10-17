/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: subscribeChapterById
// ====================================================

export interface subscribeChapterById_chapter_parentChapter {
  __typename: "api_chapter";
  id: any;
  number: number;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface subscribeChapterById_chapter_subChapters_parentChapter {
  __typename: "api_chapter";
  id: any;
  number: number;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface subscribeChapterById_chapter_subChapters_subChapters {
  __typename: "api_chapter";
  id: any;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface subscribeChapterById_chapter_subChapters {
  __typename: "api_chapter";
  id: any;
  titleCH: string;
  titleDE: string;
  description: string;
  number: number;
  created: any;
  updated: any;
  /**
   * An object relationship
   */
  parentChapter: subscribeChapterById_chapter_subChapters_parentChapter | null;
  /**
   * An array relationship
   */
  subChapters: subscribeChapterById_chapter_subChapters_subChapters[];
}

export interface subscribeChapterById_chapter_components_type {
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

export interface subscribeChapterById_chapter_components_texts_translations_language {
  __typename: "api_language";
  id: any;
  code: string;
}

export interface subscribeChapterById_chapter_components_texts_translations {
  __typename: "api_translation";
  id: any;
  textField: string;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_components_texts_translations_language;
}

export interface subscribeChapterById_chapter_components_texts {
  __typename: "api_text";
  id: any;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: subscribeChapterById_chapter_components_texts_translations[];
}

export interface subscribeChapterById_chapter_components_children_type {
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

export interface subscribeChapterById_chapter_components_children_texts_translations_language {
  __typename: "api_language";
  id: any;
  code: string;
}

export interface subscribeChapterById_chapter_components_children_texts_translations {
  __typename: "api_translation";
  id: any;
  textField: string;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_components_children_texts_translations_language;
}

export interface subscribeChapterById_chapter_components_children_texts {
  __typename: "api_text";
  id: any;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: subscribeChapterById_chapter_components_children_texts_translations[];
}

export interface subscribeChapterById_chapter_components_children_children_type {
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

export interface subscribeChapterById_chapter_components_children_children_texts_translations_language {
  __typename: "api_language";
  id: any;
  code: string;
}

export interface subscribeChapterById_chapter_components_children_children_texts_translations {
  __typename: "api_translation";
  id: any;
  textField: string;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_components_children_children_texts_translations_language;
}

export interface subscribeChapterById_chapter_components_children_children_texts {
  __typename: "api_text";
  id: any;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: subscribeChapterById_chapter_components_children_children_texts_translations[];
}

export interface subscribeChapterById_chapter_components_children_children_children_type {
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

export interface subscribeChapterById_chapter_components_children_children_children_texts_translations_language {
  __typename: "api_language";
  id: any;
  code: string;
}

export interface subscribeChapterById_chapter_components_children_children_children_texts_translations {
  __typename: "api_translation";
  id: any;
  textField: string;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_components_children_children_children_texts_translations_language;
}

export interface subscribeChapterById_chapter_components_children_children_children_texts {
  __typename: "api_text";
  id: any;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: subscribeChapterById_chapter_components_children_children_children_texts_translations[];
}

export interface subscribeChapterById_chapter_components_children_children_children_children_type {
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

export interface subscribeChapterById_chapter_components_children_children_children_children_texts_translations_language {
  __typename: "api_language";
  id: any;
  code: string;
}

export interface subscribeChapterById_chapter_components_children_children_children_children_texts_translations {
  __typename: "api_translation";
  id: any;
  textField: string;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_components_children_children_children_children_texts_translations_language;
}

export interface subscribeChapterById_chapter_components_children_children_children_children_texts {
  __typename: "api_text";
  id: any;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: subscribeChapterById_chapter_components_children_children_children_children_texts_translations[];
}

export interface subscribeChapterById_chapter_components_children_children_children_children {
  __typename: "api_component";
  id: any;
  data: string;
  state: string;
  position: number | null;
  /**
   * An object relationship
   */
  type: subscribeChapterById_chapter_components_children_children_children_children_type;
  /**
   * An array relationship
   */
  texts: subscribeChapterById_chapter_components_children_children_children_children_texts[];
}

export interface subscribeChapterById_chapter_components_children_children_children {
  __typename: "api_component";
  id: any;
  data: string;
  state: string;
  position: number | null;
  /**
   * An object relationship
   */
  type: subscribeChapterById_chapter_components_children_children_children_type;
  /**
   * An array relationship
   */
  texts: subscribeChapterById_chapter_components_children_children_children_texts[];
  /**
   * An array relationship
   */
  children: subscribeChapterById_chapter_components_children_children_children_children[];
}

export interface subscribeChapterById_chapter_components_children_children {
  __typename: "api_component";
  id: any;
  data: string;
  state: string;
  position: number | null;
  /**
   * An object relationship
   */
  type: subscribeChapterById_chapter_components_children_children_type;
  /**
   * An array relationship
   */
  texts: subscribeChapterById_chapter_components_children_children_texts[];
  /**
   * An array relationship
   */
  children: subscribeChapterById_chapter_components_children_children_children[];
}

export interface subscribeChapterById_chapter_components_children {
  __typename: "api_component";
  id: any;
  data: string;
  state: string;
  position: number | null;
  /**
   * An object relationship
   */
  type: subscribeChapterById_chapter_components_children_type;
  /**
   * An array relationship
   */
  texts: subscribeChapterById_chapter_components_children_texts[];
  /**
   * An array relationship
   */
  children: subscribeChapterById_chapter_components_children_children[];
}

export interface subscribeChapterById_chapter_components {
  __typename: "api_component";
  id: any;
  data: string;
  state: string;
  position: number | null;
  /**
   * An object relationship
   */
  type: subscribeChapterById_chapter_components_type;
  /**
   * An array relationship
   */
  texts: subscribeChapterById_chapter_components_texts[];
  /**
   * An array relationship
   */
  children: subscribeChapterById_chapter_components_children[];
}

export interface subscribeChapterById_chapter {
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
  parentChapter: subscribeChapterById_chapter_parentChapter | null;
  /**
   * An array relationship
   */
  subChapters: subscribeChapterById_chapter_subChapters[];
  /**
   * An array relationship
   */
  components: subscribeChapterById_chapter_components[];
}

export interface subscribeChapterById {
  /**
   * fetch data from the table: "api_chapter" using primary key columns
   */
  chapter: subscribeChapterById_chapter | null;
}

export interface subscribeChapterByIdVariables {
  id: any;
}
