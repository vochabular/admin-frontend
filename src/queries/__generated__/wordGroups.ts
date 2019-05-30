/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: wordGroups
// ====================================================

export interface wordGroups_wordGroups_fkChapter {
  __typename: "ChapterType";
  id: string;
}

export interface wordGroups_wordGroups {
  __typename: "WordGroupType";
  id: string;
  titleCh: string;
  titleDe: string;
  fkChapter: wordGroups_wordGroups_fkChapter;
}

export interface wordGroups {
  wordGroups: (wordGroups_wordGroups | null)[] | null;
}
