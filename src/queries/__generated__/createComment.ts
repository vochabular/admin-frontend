/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { api_comment_insert_input } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createComment
// ====================================================

export interface createComment_insert_api_comment_returning_author {
  __typename: "api_profile";
  id: any;
  firstname: string;
  lastname: string;
}

export interface createComment_insert_api_comment_returning {
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
  author: createComment_insert_api_comment_returning_author | null;
  componentId: any;
}

export interface createComment_insert_api_comment {
  __typename: "api_comment_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: createComment_insert_api_comment_returning[];
}

export interface createComment {
  /**
   * insert data into the table: "api_comment"
   */
  insert_api_comment: createComment_insert_api_comment | null;
}

export interface createCommentVariables {
  comment: api_comment_insert_input;
}
