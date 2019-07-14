/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ComponentState } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: chapters
// ====================================================

export interface chapters_chapters_edges_node_parentChapter {
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

export interface chapters_chapters_edges_node_chapterSet_edges_node {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface chapters_chapters_edges_node_chapterSet_edges {
  __typename: "ChapterTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapters_chapters_edges_node_chapterSet_edges_node | null;
}

export interface chapters_chapters_edges_node_chapterSet {
  __typename: "ChapterTypeConnection";
  edges: (chapters_chapters_edges_node_chapterSet_edges | null)[];
}

export interface chapters_chapters_edges_node_componentSet_edges_node_texts_edges_node_translations_edges_node {
  __typename: "TranslationType";
  /**
   * The ID of the object.
   */
  id: string;
  language: string;
  textField: string;
}

export interface chapters_chapters_edges_node_componentSet_edges_node_texts_edges_node_translations_edges {
  __typename: "TranslationTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapters_chapters_edges_node_componentSet_edges_node_texts_edges_node_translations_edges_node | null;
}

export interface chapters_chapters_edges_node_componentSet_edges_node_texts_edges_node_translations {
  __typename: "TranslationTypeConnection";
  edges: (chapters_chapters_edges_node_componentSet_edges_node_texts_edges_node_translations_edges | null)[];
}

export interface chapters_chapters_edges_node_componentSet_edges_node_texts_edges_node {
  __typename: "TextType";
  /**
   * The ID of the object.
   */
  id: string;
  translations: chapters_chapters_edges_node_componentSet_edges_node_texts_edges_node_translations | null;
}

export interface chapters_chapters_edges_node_componentSet_edges_node_texts_edges {
  __typename: "TextTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapters_chapters_edges_node_componentSet_edges_node_texts_edges_node | null;
}

export interface chapters_chapters_edges_node_componentSet_edges_node_texts {
  __typename: "TextTypeConnection";
  edges: (chapters_chapters_edges_node_componentSet_edges_node_texts_edges | null)[];
}

export interface chapters_chapters_edges_node_componentSet_edges_node {
  __typename: "Component_Type";
  /**
   * The ID of the object.
   */
  id: string;
  data: string;
  state: ComponentState;
  texts: chapters_chapters_edges_node_componentSet_edges_node_texts | null;
}

export interface chapters_chapters_edges_node_componentSet_edges {
  __typename: "Component_TypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapters_chapters_edges_node_componentSet_edges_node | null;
}

export interface chapters_chapters_edges_node_componentSet {
  __typename: "Component_TypeConnection";
  edges: (chapters_chapters_edges_node_componentSet_edges | null)[];
}

export interface chapters_chapters_edges_node {
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
  created: any;
  updated: any;
  parentChapter: chapters_chapters_edges_node_parentChapter | null;
  chapterSet: chapters_chapters_edges_node_chapterSet | null;
  componentSet: chapters_chapters_edges_node_componentSet | null;
}

export interface chapters_chapters_edges {
  __typename: "ChapterTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapters_chapters_edges_node | null;
}

export interface chapters_chapters {
  __typename: "ChapterTypeConnection";
  edges: (chapters_chapters_edges | null)[];
}

export interface chapters {
  chapters: chapters_chapters | null;
}
