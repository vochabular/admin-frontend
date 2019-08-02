/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: subscribeActiveComments
// ====================================================

export interface subscribeActiveComments_comments_author {
  __typename: "api_profile";
  id: any;
  firstname: string;
  lastname: string;
}

export interface subscribeActiveComments_comments_answers_author {
  __typename: "api_profile";
  id: any;
  firstname: string;
  lastname: string;
}

export interface subscribeActiveComments_comments_answers {
  __typename: "api_comment";
  id: any;
  text: string;
  context: string | null;
  active: boolean;
  written: any | null;
  /**
   * An object relationship
   */
  author: subscribeActiveComments_comments_answers_author | null;
}

export interface subscribeActiveComments_comments {
  __typename: "api_comment";
  id: any;
  text: string;
  context: string | null;
  active: boolean;
  written: any | null;
  /**
   * An object relationship
   */
  author: subscribeActiveComments_comments_author | null;
  /**
   * An array relationship
   */
  answers: subscribeActiveComments_comments_answers[];
}

export interface subscribeActiveComments {
  /**
   * fetch data from the table: "api_comment"
   */
  comments: subscribeActiveComments_comments[];
}
