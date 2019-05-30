/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserParts
// ====================================================

export interface UserParts {
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
