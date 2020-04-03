/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentParts
// ====================================================

export interface CommentParts_author {
  __typename: "api_profile";
  id: any;
  firstname: string;
  lastname: string;
}

export interface CommentParts {
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
  author: CommentParts_author | null;
  componentId: any;
}
