/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateProfileInput, ProfileLanguage } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_updateProfile_profile {
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

export interface updateProfile_updateProfile {
  __typename: "UpdateProfilePayload";
  profile: updateProfile_updateProfile_profile | null;
}

export interface updateProfile {
  updateProfile: updateProfile_updateProfile | null;
}

export interface updateProfileVariables {
  profile: UpdateProfileInput;
}
