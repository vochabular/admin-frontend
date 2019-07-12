/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProfileLanguage } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UserParts
// ====================================================

export interface UserParts {
  __typename: "ProfileType";
  id: string;
  firstname: string;
  lastname: string;
  roles: string;
  language: ProfileLanguage;
  translatorLanguages: string;
  eventNotifications: boolean;
  setupCompleted: boolean;
}
