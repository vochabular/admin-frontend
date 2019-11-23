/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChapterHeaderParts
// ====================================================

export interface ChapterHeaderParts_languages_language {
  __typename: "api_language";
  id: string;
}

export interface ChapterHeaderParts_languages {
  __typename: "api_chaptertitle";
  id: any;
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

export interface ChapterHeaderParts_subChapters {
  __typename: "api_chapter";
  id: any;
  description: string;
}

export interface ChapterHeaderParts {
  __typename: "api_chapter";
  id: any;
  number: number;
  description: string;
  created: any;
  updated: any;
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
