/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChapterHeaderParts
// ====================================================

export interface ChapterHeaderParts_parentChapter {
  __typename: "ChapterType";
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface ChapterHeaderParts_chapterSet {
  __typename: "ChapterType";
  id: string;
  title: string;
  description: string;
}

export interface ChapterHeaderParts {
  __typename: "ChapterType";
  id: string;
  number: number;
  title: string;
  description: string;
  parentChapter: ChapterHeaderParts_parentChapter | null;
  chapterSet: (ChapterHeaderParts_chapterSet | null)[] | null;
}
