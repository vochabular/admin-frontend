/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ComponentState } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: chapterById
// ====================================================

export interface chapterById_chapter_parentChapter {
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

export interface chapterById_chapter_chapterSet_edges_node {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface chapterById_chapter_chapterSet_edges {
  __typename: "ChapterTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapterById_chapter_chapterSet_edges_node | null;
}

export interface chapterById_chapter_chapterSet {
  __typename: "ChapterTypeConnection";
  edges: (chapterById_chapter_chapterSet_edges | null)[];
}

export interface chapterById_chapter_subChapters_edges_node_parentChapter {
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

export interface chapterById_chapter_subChapters_edges_node_chapterSet_edges_node {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
  titleCH: string;
  titleDE: string;
  description: string;
}

export interface chapterById_chapter_subChapters_edges_node_chapterSet_edges {
  __typename: "ChapterTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapterById_chapter_subChapters_edges_node_chapterSet_edges_node | null;
}

export interface chapterById_chapter_subChapters_edges_node_chapterSet {
  __typename: "ChapterTypeConnection";
  edges: (chapterById_chapter_subChapters_edges_node_chapterSet_edges | null)[];
}

export interface chapterById_chapter_subChapters_edges_node {
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
  parentChapter: chapterById_chapter_subChapters_edges_node_parentChapter | null;
  chapterSet: chapterById_chapter_subChapters_edges_node_chapterSet | null;
}

export interface chapterById_chapter_subChapters_edges {
  __typename: "ChapterTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapterById_chapter_subChapters_edges_node | null;
}

export interface chapterById_chapter_subChapters {
  __typename: "ChapterTypeConnection";
  edges: (chapterById_chapter_subChapters_edges | null)[];
}

export interface chapterById_chapter_components_edges_node_texts_edges_node_translations_edges_node {
  __typename: "TranslationType";
  /**
   * The ID of the object.
   */
  id: string;
  language: string;
  textField: string;
}

export interface chapterById_chapter_components_edges_node_texts_edges_node_translations_edges {
  __typename: "TranslationTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapterById_chapter_components_edges_node_texts_edges_node_translations_edges_node | null;
}

export interface chapterById_chapter_components_edges_node_texts_edges_node_translations {
  __typename: "TranslationTypeConnection";
  edges: (chapterById_chapter_components_edges_node_texts_edges_node_translations_edges | null)[];
}

export interface chapterById_chapter_components_edges_node_texts_edges_node {
  __typename: "TextType";
  /**
   * The ID of the object.
   */
  id: string;
  translations: chapterById_chapter_components_edges_node_texts_edges_node_translations | null;
}

export interface chapterById_chapter_components_edges_node_texts_edges {
  __typename: "TextTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapterById_chapter_components_edges_node_texts_edges_node | null;
}

export interface chapterById_chapter_components_edges_node_texts {
  __typename: "TextTypeConnection";
  edges: (chapterById_chapter_components_edges_node_texts_edges | null)[];
}

export interface chapterById_chapter_components_edges_node {
  __typename: "Component_Type";
  /**
   * The ID of the object.
   */
  id: string;
  data: string;
  state: ComponentState;
  texts: chapterById_chapter_components_edges_node_texts | null;
}

export interface chapterById_chapter_components_edges {
  __typename: "Component_TypeEdge";
  /**
   * The item at the end of the edge
   */
  node: chapterById_chapter_components_edges_node | null;
}

export interface chapterById_chapter_components {
  __typename: "Component_TypeConnection";
  edges: (chapterById_chapter_components_edges | null)[];
}

export interface chapterById_chapter {
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
  parentChapter: chapterById_chapter_parentChapter | null;
  chapterSet: chapterById_chapter_chapterSet | null;
  subChapters: chapterById_chapter_subChapters | null;
  components: chapterById_chapter_components | null;
}

export interface chapterById {
  chapter: chapterById_chapter | null;
}

export interface chapterByIdVariables {
  id?: number | null;
}
