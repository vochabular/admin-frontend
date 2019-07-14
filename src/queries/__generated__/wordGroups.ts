/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: wordGroups
// ====================================================

export interface wordGroups_wordGroups_edges_node_fkChapter {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface wordGroups_wordGroups_edges_node_words_wordch {
  __typename: "WordCHType";
  id: string;
  audio: string | null;
  text: string;
  exampleSentence: string | null;
}

export interface wordGroups_wordGroups_edges_node_words_wordde {
  __typename: "WordDEType";
  id: string;
  audio: string | null;
  text: string;
  exampleSentence: string | null;
}

export interface wordGroups_wordGroups_edges_node_words_worden {
  __typename: "WordENType";
  id: string;
  audio: string | null;
  text: string;
  exampleSentence: string | null;
}

export interface wordGroups_wordGroups_edges_node_words_wordar {
  __typename: "WordARType";
  id: string;
  audio: string | null;
  text: string;
  exampleSentence: string | null;
}

export interface wordGroups_wordGroups_edges_node_words_wordfa {
  __typename: "WordFAType";
  id: string;
  audio: string | null;
  text: string;
  exampleSentence: string | null;
}

export interface wordGroups_wordGroups_edges_node_words {
  __typename: "WordType";
  id: string;
  wordch: wordGroups_wordGroups_edges_node_words_wordch | null;
  wordde: wordGroups_wordGroups_edges_node_words_wordde | null;
  worden: wordGroups_wordGroups_edges_node_words_worden | null;
  wordar: wordGroups_wordGroups_edges_node_words_wordar | null;
  wordfa: wordGroups_wordGroups_edges_node_words_wordfa | null;
}

export interface wordGroups_wordGroups_edges_node {
  __typename: "WordGroupType";
  /**
   * The ID of the object.
   */
  id: string;
  titleCh: string;
  titleDe: string;
  fkChapter: wordGroups_wordGroups_edges_node_fkChapter;
  words: (wordGroups_wordGroups_edges_node_words | null)[] | null;
}

export interface wordGroups_wordGroups_edges {
  __typename: "WordGroupTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: wordGroups_wordGroups_edges_node | null;
}

export interface wordGroups_wordGroups {
  __typename: "WordGroupTypeConnection";
  edges: (wordGroups_wordGroups_edges | null)[];
}

export interface wordGroups {
  wordGroups: wordGroups_wordGroups | null;
}
