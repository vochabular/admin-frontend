/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: subscribeChapterById
// ====================================================

export interface subscribeChapterById_chapter_languages_language {
  __typename: "api_language";
  id: string;
  name: string;
}

export interface subscribeChapterById_chapter_languages {
  __typename: "api_chaptertitle";
  id: any;
  title: string;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_languages_language;
}

export interface subscribeChapterById_chapter_parentChapter {
  __typename: "api_chapter";
  id: any;
  number: number;
  description: string;
}

export interface subscribeChapterById_chapter_subChapters_languages_language {
  __typename: "api_language";
  id: string;
  name: string;
}

export interface subscribeChapterById_chapter_subChapters_languages {
  __typename: "api_chaptertitle";
  id: any;
  title: string;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_subChapters_languages_language;
}

export interface subscribeChapterById_chapter_subChapters_parentChapter {
  __typename: "api_chapter";
  id: any;
  number: number;
  description: string;
}

export interface subscribeChapterById_chapter_subChapters_subChapters {
  __typename: "api_chapter";
  id: any;
  description: string;
}

export interface subscribeChapterById_chapter_subChapters {
  __typename: "api_chapter";
  id: any;
  description: string;
  number: number;
  created: any;
  updated: any;
  /**
   * An array relationship
   */
  languages: subscribeChapterById_chapter_subChapters_languages[];
  /**
   * An object relationship
   */
  parentChapter: subscribeChapterById_chapter_subChapters_parentChapter | null;
  /**
   * An array relationship
   */
  subChapters: subscribeChapterById_chapter_subChapters_subChapters[];
}

export interface subscribeChapterById_chapter_components_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface subscribeChapterById_chapter_components_type_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface subscribeChapterById_chapter_components_type_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: subscribeChapterById_chapter_components_type_childrenCount_aggregate | null;
}

export interface subscribeChapterById_chapter_components_type {
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
  frontendWidget: subscribeChapterById_chapter_components_type_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: subscribeChapterById_chapter_components_type_childrenCount;
}

export interface subscribeChapterById_chapter_components_texts_translations_language {
  __typename: "api_language";
  id: string;
}

export interface subscribeChapterById_chapter_components_texts_translations {
  __typename: "api_translation";
  id: any;
  text_field: string | null;
  valid: boolean;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_components_texts_translations_language;
}

export interface subscribeChapterById_chapter_components_texts {
  __typename: "api_text";
  id: any;
  placeholder: string | null;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: subscribeChapterById_chapter_components_texts_translations[];
}

export interface subscribeChapterById_chapter_components_media {
  __typename: "api_media";
  id: any;
  type: string;
  url: string;
}

export interface subscribeChapterById_chapter_components_children_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface subscribeChapterById_chapter_components_children_type_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface subscribeChapterById_chapter_components_children_type_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: subscribeChapterById_chapter_components_children_type_childrenCount_aggregate | null;
}

export interface subscribeChapterById_chapter_components_children_type {
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
  frontendWidget: subscribeChapterById_chapter_components_children_type_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: subscribeChapterById_chapter_components_children_type_childrenCount;
}

export interface subscribeChapterById_chapter_components_children_texts_translations_language {
  __typename: "api_language";
  id: string;
}

export interface subscribeChapterById_chapter_components_children_texts_translations {
  __typename: "api_translation";
  id: any;
  text_field: string | null;
  valid: boolean;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_components_children_texts_translations_language;
}

export interface subscribeChapterById_chapter_components_children_texts {
  __typename: "api_text";
  id: any;
  placeholder: string | null;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: subscribeChapterById_chapter_components_children_texts_translations[];
}

export interface subscribeChapterById_chapter_components_children_media {
  __typename: "api_media";
  id: any;
  type: string;
  url: string;
}

export interface subscribeChapterById_chapter_components_children_children_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface subscribeChapterById_chapter_components_children_children_type_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface subscribeChapterById_chapter_components_children_children_type_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: subscribeChapterById_chapter_components_children_children_type_childrenCount_aggregate | null;
}

export interface subscribeChapterById_chapter_components_children_children_type {
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
  frontendWidget: subscribeChapterById_chapter_components_children_children_type_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: subscribeChapterById_chapter_components_children_children_type_childrenCount;
}

export interface subscribeChapterById_chapter_components_children_children_texts_translations_language {
  __typename: "api_language";
  id: string;
}

export interface subscribeChapterById_chapter_components_children_children_texts_translations {
  __typename: "api_translation";
  id: any;
  text_field: string | null;
  valid: boolean;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_components_children_children_texts_translations_language;
}

export interface subscribeChapterById_chapter_components_children_children_texts {
  __typename: "api_text";
  id: any;
  placeholder: string | null;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: subscribeChapterById_chapter_components_children_children_texts_translations[];
}

export interface subscribeChapterById_chapter_components_children_children_media {
  __typename: "api_media";
  id: any;
  type: string;
  url: string;
}

export interface subscribeChapterById_chapter_components_children_children_children_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface subscribeChapterById_chapter_components_children_children_children_type_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface subscribeChapterById_chapter_components_children_children_children_type_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: subscribeChapterById_chapter_components_children_children_children_type_childrenCount_aggregate | null;
}

export interface subscribeChapterById_chapter_components_children_children_children_type {
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
  frontendWidget: subscribeChapterById_chapter_components_children_children_children_type_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: subscribeChapterById_chapter_components_children_children_children_type_childrenCount;
}

export interface subscribeChapterById_chapter_components_children_children_children_texts_translations_language {
  __typename: "api_language";
  id: string;
}

export interface subscribeChapterById_chapter_components_children_children_children_texts_translations {
  __typename: "api_translation";
  id: any;
  text_field: string | null;
  valid: boolean;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_components_children_children_children_texts_translations_language;
}

export interface subscribeChapterById_chapter_components_children_children_children_texts {
  __typename: "api_text";
  id: any;
  placeholder: string | null;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: subscribeChapterById_chapter_components_children_children_children_texts_translations[];
}

export interface subscribeChapterById_chapter_components_children_children_children_media {
  __typename: "api_media";
  id: any;
  type: string;
  url: string;
}

export interface subscribeChapterById_chapter_components_children_children_children_children_type_frontendWidget {
  __typename: "api_componenttype";
  id: any;
  name: string;
  label: string;
  icon: string;
}

export interface subscribeChapterById_chapter_components_children_children_children_children_type_childrenCount_aggregate {
  __typename: "api_componenttype_aggregate_fields";
  count: number | null;
}

export interface subscribeChapterById_chapter_components_children_children_children_children_type_childrenCount {
  __typename: "api_componenttype_aggregate";
  aggregate: subscribeChapterById_chapter_components_children_children_children_children_type_childrenCount_aggregate | null;
}

export interface subscribeChapterById_chapter_components_children_children_children_children_type {
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
  frontendWidget: subscribeChapterById_chapter_components_children_children_children_children_type_frontendWidget | null;
  /**
   * An aggregated array relationship
   */
  childrenCount: subscribeChapterById_chapter_components_children_children_children_children_type_childrenCount;
}

export interface subscribeChapterById_chapter_components_children_children_children_children_texts_translations_language {
  __typename: "api_language";
  id: string;
}

export interface subscribeChapterById_chapter_components_children_children_children_children_texts_translations {
  __typename: "api_translation";
  id: any;
  text_field: string | null;
  valid: boolean;
  /**
   * An object relationship
   */
  language: subscribeChapterById_chapter_components_children_children_children_children_texts_translations_language;
}

export interface subscribeChapterById_chapter_components_children_children_children_children_texts {
  __typename: "api_text";
  id: any;
  placeholder: string | null;
  translatable: boolean;
  /**
   * An array relationship
   */
  translations: subscribeChapterById_chapter_components_children_children_children_children_texts_translations[];
}

export interface subscribeChapterById_chapter_components_children_children_children_children_media {
  __typename: "api_media";
  id: any;
  type: string;
  url: string;
}

export interface subscribeChapterById_chapter_components_children_children_children_children {
  __typename: "api_component";
  id: any;
  data: any;
  state: string;
  position: number;
  /**
   * An object relationship
   */
  type: subscribeChapterById_chapter_components_children_children_children_children_type;
  /**
   * An array relationship
   */
  texts: subscribeChapterById_chapter_components_children_children_children_children_texts[];
  /**
   * An array relationship
   */
  media: subscribeChapterById_chapter_components_children_children_children_children_media[];
}

export interface subscribeChapterById_chapter_components_children_children_children {
  __typename: "api_component";
  id: any;
  data: any;
  state: string;
  position: number;
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
  media: subscribeChapterById_chapter_components_children_children_children_media[];
  /**
   * An array relationship
   */
  children: subscribeChapterById_chapter_components_children_children_children_children[];
}

export interface subscribeChapterById_chapter_components_children_children {
  __typename: "api_component";
  id: any;
  data: any;
  state: string;
  position: number;
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
  media: subscribeChapterById_chapter_components_children_children_media[];
  /**
   * An array relationship
   */
  children: subscribeChapterById_chapter_components_children_children_children[];
}

export interface subscribeChapterById_chapter_components_children {
  __typename: "api_component";
  id: any;
  data: any;
  state: string;
  position: number;
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
  media: subscribeChapterById_chapter_components_children_media[];
  /**
   * An array relationship
   */
  children: subscribeChapterById_chapter_components_children_children[];
}

export interface subscribeChapterById_chapter_components {
  __typename: "api_component";
  id: any;
  data: any;
  state: string;
  position: number;
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
  media: subscribeChapterById_chapter_components_media[];
  /**
   * An array relationship
   */
  children: subscribeChapterById_chapter_components_children[];
}

export interface subscribeChapterById_chapter {
  __typename: "api_chapter";
  id: any;
  number: number;
  description: string;
  created: any;
  updated: any;
  /**
   * An array relationship
   */
  languages: subscribeChapterById_chapter_languages[];
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
