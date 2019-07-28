/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CommentContext, ProfileLanguage } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CommentParts
// ====================================================

export interface CommentParts_fkAuthor {
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
  fkAuthor: CommentParts_fkAuthor | null;
}
