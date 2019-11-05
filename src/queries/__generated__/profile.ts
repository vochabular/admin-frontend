/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProfileLanguage } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: profile
// ====================================================

export interface profile_profile {
  __typename: "ProfileType";
  id: any;
  firstname: string;
  lastname: string;
  roles: string;
  currentRole: string;
  language: ProfileLanguage;
  translatorLanguages: string;
  eventNotifications: boolean;
  setupCompleted: boolean;
}

export interface profile {
  profile: profile_profile | null;
}

export interface profileVariables {
  username?: string | null;
}
