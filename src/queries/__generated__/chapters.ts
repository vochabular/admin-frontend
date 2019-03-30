/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: chapters
// ====================================================

export interface chapters_chapters_chapterSet {
  __typename: "ChapterType";
  id: string;
  title: string;
}

export interface chapters_chapters {
  __typename: "ChapterType";
  id: string;
  title: string;
  chapterSet: (chapters_chapters_chapterSet | null)[] | null;
}

export interface chapters {
  chapters: (chapters_chapters | null)[] | null;
}
