/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: resolveComment
// ====================================================

export interface resolveComment_update_api_comment_returning_author {
  __typename: "api_profile";
  id: any;
  firstname: string;
  lastname: string;
}

export interface resolveComment_update_api_comment_returning {
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
  author: resolveComment_update_api_comment_returning_author | null;
  componentId: any;
}

export interface resolveComment_update_api_comment {
  __typename: "api_comment_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: resolveComment_update_api_comment_returning[];
}

export interface resolveComment {
  /**
   * update data of the table: "api_comment"
   */
  update_api_comment: resolveComment_update_api_comment | null;
}

export interface resolveCommentVariables {
  id: any;
}
