/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentParts
// ====================================================

export interface CommentParts_authorName {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  /**
   * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
   */
  isActive: boolean;
}

export interface CommentParts {
  __typename: "CommentType";
  /**
   * The ID of the object.
   */
  id: string;
  comment: string;
  active: boolean;
  written: any | null;
  authorName: CommentParts_authorName;
}
