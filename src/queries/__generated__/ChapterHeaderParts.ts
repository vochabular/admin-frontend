/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChapterHeaderParts
// ====================================================

export interface ChapterHeaderParts_parentChapter {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
  number: number;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface ChapterHeaderParts_chapterSet_edges_node {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface ChapterHeaderParts_chapterSet_edges {
  __typename: "ChapterTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ChapterHeaderParts_chapterSet_edges_node | null;
}

export interface ChapterHeaderParts_chapterSet {
  __typename: "ChapterTypeConnection";
  edges: (ChapterHeaderParts_chapterSet_edges | null)[];
}

export interface ChapterHeaderParts {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The ID of the object.
   */
  dbId: string;
  number: number;
  titleCH: string;
  titleDE: string;
  description: string;
  parentChapter: ChapterHeaderParts_parentChapter | null;
  chapterSet: ChapterHeaderParts_chapterSet | null;
}
