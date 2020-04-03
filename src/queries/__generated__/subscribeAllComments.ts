/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: subscribeAllComments
// ====================================================

export interface subscribeAllComments_comments_author {
  __typename: "api_profile";
  id: any;
  firstname: string;
  lastname: string;
}

export interface subscribeAllComments_comments_answers_author {
  __typename: "api_profile";
  id: any;
  firstname: string;
  lastname: string;
}

export interface subscribeAllComments_comments_answers {
  __typename: "api_comment";
  id: any;
  text: string;
  context: string | null;
  active: boolean;
  created: any;
  updated: any;
  /**
   * An object relationship
   */
  author: subscribeAllComments_comments_answers_author | null;
  componentId: any;
}

export interface subscribeAllComments_comments {
  __typename: "api_comment";
  id: any;
  text: string;
  context: string | null;
  active: boolean;
  created: any;
  updated: any;
  /**
   * An object relationship
   */
  author: subscribeAllComments_comments_author | null;
  componentId: any;
  /**
   * An array relationship
   */
  answers: subscribeAllComments_comments_answers[];
}

export interface subscribeAllComments {
  /**
   * fetch data from the table: "api_comment"
   */
  comments: subscribeAllComments_comments[];
}

export interface subscribeAllCommentsVariables {
  chapterId: any;
}
