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

export interface subscribeChapterById_chapter_components_texts_translations {
  __typename: "api_translation";
  id: any;
  textField: string;
}

export interface subscribeChapterById_chapter_components_texts {
  __typename: "api_text";
  id: any;
  /**
   * An array relationship
   */
  translations: subscribeChapterById_chapter_components_texts_translations[];
}

export interface subscribeChapterById_chapter_components {
  __typename: "api_component";
  id: any;
  data: string;
  state: string;
  /**
   * An array relationship
   */
  texts: subscribeChapterById_chapter_components_texts[];
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
