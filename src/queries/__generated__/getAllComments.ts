/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllComments
// ====================================================

export interface getAllComments_comments_authorName {
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

export interface getAllComments_comments {
  __typename: "CommentType";
  id: string;
  comment: string;
  active: boolean;
  written: any | null;
  authorName: getAllComments_comments_authorName;
}

export interface getAllComments {
  comments: (getAllComments_comments | null)[] | null;
}
