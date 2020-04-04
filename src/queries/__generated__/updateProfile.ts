/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProfileInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_updateProfile_profile_language {
  __typename: "LanguageType";
  id: string;
  name: string;
}

export interface updateProfile_updateProfile_profile_translatorLanguages {
  __typename: "LanguageType";
  id: string;
  name: string;
}

export interface updateProfile_updateProfile_profile {
  __typename: "ProfileType";
  id: any;
  firstname: string;
  lastname: string;
  roles: string;
  currentRole: string;
  eventNotifications: boolean;
  setupCompleted: boolean;
  language: updateProfile_updateProfile_profile_language | null;
  translatorLanguages: updateProfile_updateProfile_profile_translatorLanguages[];
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
