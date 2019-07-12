/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CommentContext } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CommentParts
// ====================================================

export interface CommentParts_fkComponent {
  __typename: "Component_Type";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CommentParts_fkParentComment {
  __typename: "CommentType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CommentParts {
  __typename: "CommentType";
  /**
   * The ID of the object.
   */
  id: string;
  text: string;
  context: CommentContext | null;
  active: boolean;
  written: any | null;
  fkComponent: CommentParts_fkComponent;
  fkParentComment: CommentParts_fkParentComment | null;
}
