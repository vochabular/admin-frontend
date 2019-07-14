/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ComponentState } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ComponentParts
// ====================================================

export interface ComponentParts_texts_edges_node_translations_edges_node {
  __typename: "TranslationType";
  /**
   * The ID of the object.
   */
  id: string;
  language: string;
  textField: string;
}

export interface ComponentParts_texts_edges_node_translations_edges {
  __typename: "TranslationTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ComponentParts_texts_edges_node_translations_edges_node | null;
}

export interface ComponentParts_texts_edges_node_translations {
  __typename: "TranslationTypeConnection";
  edges: (ComponentParts_texts_edges_node_translations_edges | null)[];
}

export interface ComponentParts_texts_edges_node {
  __typename: "TextType";
  /**
   * The ID of the object.
   */
  id: string;
  translations: ComponentParts_texts_edges_node_translations | null;
}

export interface ComponentParts_texts_edges {
  __typename: "TextTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: ComponentParts_texts_edges_node | null;
}

export interface ComponentParts_texts {
  __typename: "TextTypeConnection";
  edges: (ComponentParts_texts_edges | null)[];
}

export interface ComponentParts {
  __typename: "Component_Type";
  /**
   * The ID of the object.
   */
  id: string;
  data: string;
  state: ComponentState;
  texts: ComponentParts_texts | null;
}
