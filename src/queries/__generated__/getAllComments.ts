/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CommentContext, ProfileLanguage } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getAllComments
// ====================================================

export interface getAllComments_comments_edges_node_fkAuthor {
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

export interface getAllComments_comments_edges_node_commentSet_edges_node_fkAuthor {
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

export interface getAllComments_comments_edges_node_commentSet_edges_node {
  __typename: "CommentType";
  /**
   * The ID of the object.
   */
  id: string;
  text: string;
  context: CommentContext | null;
  active: boolean;
  written: any | null;
  fkAuthor: getAllComments_comments_edges_node_commentSet_edges_node_fkAuthor | null;
}

export interface getAllComments_comments_edges_node_commentSet_edges {
  __typename: "CommentTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getAllComments_comments_edges_node_commentSet_edges_node | null;
}

export interface getAllComments_comments_edges_node_commentSet {
  __typename: "CommentTypeConnection";
  edges: (getAllComments_comments_edges_node_commentSet_edges | null)[];
}

export interface getAllComments_comments_edges_node_fkComponent {
  __typename: "Component_Type";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getAllComments_comments_edges_node_fkParentComment {
  __typename: "CommentType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getAllComments_comments_edges_node {
  __typename: "CommentType";
  /**
   * The ID of the object.
   */
  id: string;
  text: string;
  context: CommentContext | null;
  active: boolean;
  written: any | null;
  fkAuthor: getAllComments_comments_edges_node_fkAuthor | null;
  commentSet: getAllComments_comments_edges_node_commentSet | null;
  fkComponent: getAllComments_comments_edges_node_fkComponent;
  fkParentComment: getAllComments_comments_edges_node_fkParentComment | null;
}

export interface getAllComments_comments_edges {
  __typename: "CommentTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getAllComments_comments_edges_node | null;
}

export interface getAllComments_comments {
  __typename: "CommentTypeConnection";
  edges: (getAllComments_comments_edges | null)[];
}

export interface getAllComments {
  comments: getAllComments_comments | null;
}
