/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteComment
// ====================================================

export interface deleteComment_delete_api_comment {
  __typename: "api_comment_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface deleteComment {
  /**
   * delete data from the table: "api_comment"
   */
  delete_api_comment: deleteComment_delete_api_comment | null;
}

export interface deleteCommentVariables {
  id: any;
}
