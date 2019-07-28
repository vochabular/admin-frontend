/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CommentInput, CommentContext, ProfileLanguage } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createComment
// ====================================================

export interface createComment_createComment_comment_fkAuthor {
  __typename: "ProfileType";
  id: any;
  firstname: string;
  lastname: string;
  roles: string;
  language: ProfileLanguage;
  translatorLanguages: string;
  eventNotifications: boolean;
  setupCompleted: boolean;
}

export interface createComment_createComment_comment {
  __typename: "CommentType";
  /**
   * The ID of the object.
   */
  id: string;
  text: string;
  context: CommentContext | null;
  active: boolean;
  written: any | null;
  fkAuthor: createComment_createComment_comment_fkAuthor | null;
}

export interface createComment_createComment {
  __typename: "IntroduceCommentPayload";
  comment: createComment_createComment_comment | null;
}

export interface createComment {
  createComment: createComment_createComment | null;
}

export interface createCommentVariables {
  comment: CommentInput;
}
