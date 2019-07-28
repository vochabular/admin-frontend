/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: chaptersWordGroupsByChapterId
// ====================================================

export interface chaptersWordGroupsByChapterId_chapter_parentChapter {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface chaptersWordGroupsByChapterId_chapter_wordGroups_edges_node_words {
  __typename: "WordType";
  id: any;
}

export interface chaptersWordGroupsByChapterId_chapter_wordGroups_edges_node {
  __typename: "WordGroupType";
  /**
   * The ID of the object.
   */
  id: string;
  titleCh: string;
  titleDe: string;
  words: (chaptersWordGroupsByChapterId_chapter_wordGroups_edges_node_words | null)[] | null;
}

export interface chaptersWordGroupsByChapterId_chapter_wordGroups_edges {
  __typename: "WordGroupTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chaptersWordGroupsByChapterId_chapter_wordGroups_edges_node | null;
}

export interface chaptersWordGroupsByChapterId_chapter_wordGroups {
  __typename: "WordGroupTypeConnection";
  edges: (chaptersWordGroupsByChapterId_chapter_wordGroups_edges | null)[];
}

export interface chaptersWordGroupsByChapterId_chapter {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
  titleDE: string;
  titleCH: string;
  parentChapter: chaptersWordGroupsByChapterId_chapter_parentChapter | null;
  wordGroups: chaptersWordGroupsByChapterId_chapter_wordGroups | null;
}

export interface chaptersWordGroupsByChapterId {
  chapter: chaptersWordGroupsByChapterId_chapter | null;
}

export interface chaptersWordGroupsByChapterIdVariables {
  id?: number | null;
}
