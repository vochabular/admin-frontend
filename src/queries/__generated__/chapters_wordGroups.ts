/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: chapters_wordGroups
// ====================================================

export interface chapters_wordGroups_chapters_edges_node_parentChapter {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface chapters_wordGroups_chapters_edges_node_wordGroups_edges_node {
  __typename: "WordGroupType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface chapters_wordGroups_chapters_edges_node_wordGroups_edges {
  __typename: "WordGroupTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapters_wordGroups_chapters_edges_node_wordGroups_edges_node | null;
}

export interface chapters_wordGroups_chapters_edges_node_wordGroups {
  __typename: "WordGroupTypeConnection";
  edges: (chapters_wordGroups_chapters_edges_node_wordGroups_edges | null)[];
}

export interface chapters_wordGroups_chapters_edges_node {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
  parentChapter: chapters_wordGroups_chapters_edges_node_parentChapter | null;
  wordGroups: chapters_wordGroups_chapters_edges_node_wordGroups | null;
}

export interface chapters_wordGroups_chapters_edges {
  __typename: "ChapterTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapters_wordGroups_chapters_edges_node | null;
}

export interface chapters_wordGroups_chapters {
  __typename: "ChapterTypeConnection";
  edges: (chapters_wordGroups_chapters_edges | null)[];
}

export interface chapters_wordGroups {
  chapters: chapters_wordGroups_chapters | null;
}
