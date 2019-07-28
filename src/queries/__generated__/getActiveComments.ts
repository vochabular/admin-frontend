/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CommentContext, ProfileLanguage } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getActiveComments
// ====================================================

export interface getActiveComments_comments_edges_node_fkAuthor {
  __typename: "ProfileType";
  id: any;
  firstname: string;
  lastname: string;
  roles: string;
  language: ProfileLanguage;
  translatorLanguages: string;
  eventNotifications: boolean;
  setupCompleted: boolean;
}

export interface getActiveComments_comments_edges_node_commentSet_edges_node_fkAuthor {
  __typename: "ProfileType";
  id: any;
  firstname: string;
  lastname: string;
  roles: string;
  language: ProfileLanguage;
  translatorLanguages: string;
  eventNotifications: boolean;
  setupCompleted: boolean;
}

export interface getActiveComments_comments_edges_node_commentSet_edges_node {
  __typename: "CommentType";
  /**
   * The ID of the object.
   */
  id: string;
  text: string;
  context: CommentContext | null;
  active: boolean;
  written: any | null;
  fkAuthor: getActiveComments_comments_edges_node_commentSet_edges_node_fkAuthor | null;
}

export interface getActiveComments_comments_edges_node_commentSet_edges {
  __typename: "CommentTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getActiveComments_comments_edges_node_commentSet_edges_node | null;
}

export interface getActiveComments_comments_edges_node_commentSet {
  __typename: "CommentTypeConnection";
  edges: (getActiveComments_comments_edges_node_commentSet_edges | null)[];
}

export interface getActiveComments_comments_edges_node_fkComponent {
  __typename: "Component_Type";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getActiveComments_comments_edges_node_fkParentComment {
  __typename: "CommentType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getActiveComments_comments_edges_node {
  __typename: "CommentType";
  /**
   * The ID of the object.
   */
  id: string;
  text: string;
  context: CommentContext | null;
  active: boolean;
  written: any | null;
  fkAuthor: getActiveComments_comments_edges_node_fkAuthor | null;
  commentSet: getActiveComments_comments_edges_node_commentSet | null;
  fkComponent: getActiveComments_comments_edges_node_fkComponent;
  fkParentComment: getActiveComments_comments_edges_node_fkParentComment | null;
}

export interface getActiveComments_comments_edges {
  __typename: "CommentTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getActiveComments_comments_edges_node | null;
}

export interface getActiveComments_comments {
  __typename: "CommentTypeConnection";
  edges: (getActiveComments_comments_edges | null)[];
}

export interface getActiveComments {
  comments: getActiveComments_comments | null;
}
