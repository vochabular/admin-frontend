/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getChapterById
// ====================================================

export interface getChapterById_chapter_parentChapter {
  __typename: "api_chapter";
  id: any;
  number: number;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface getChapterById_chapter_subChapters_parentChapter {
  __typename: "api_chapter";
  id: any;
  number: number;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface getChapterById_chapter_subChapters_subChapters {
  __typename: "api_chapter";
  id: any;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface getChapterById_chapter_subChapters {
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
  parentChapter: getChapterById_chapter_subChapters_parentChapter | null;
  /**
   * An array relationship
   */
  subChapters: getChapterById_chapter_subChapters_subChapters[];
}

export interface getChapterById_chapter_components_texts_translations {
  __typename: "api_translation";
  id: any;
  textField: string;
}

export interface getChapterById_chapter_components_texts {
  __typename: "api_text";
  id: any;
  /**
   * An array relationship
   */
  translations: getChapterById_chapter_components_texts_translations[];
}

export interface getChapterById_chapter_components {
  __typename: "api_component";
  id: any;
  data: string;
  state: string;
  /**
   * An array relationship
   */
  texts: getChapterById_chapter_components_texts[];
}

export interface getChapterById_chapter {
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
  parentChapter: getChapterById_chapter_parentChapter | null;
  /**
   * An array relationship
   */
  subChapters: getChapterById_chapter_subChapters[];
  /**
   * An array relationship
   */
  components: getChapterById_chapter_components[];
}

export interface getChapterById {
  /**
   * fetch data from the table: "api_chapter" using primary key columns
   */
  chapter: getChapterById_chapter | null;
}

export interface getChapterByIdVariables {
  id: any;
}
