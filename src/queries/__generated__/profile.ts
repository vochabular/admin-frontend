/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: profile
// ====================================================

export interface profile_profile_language {
  __typename: "LanguageType";
  id: string;
  name: string;
}

export interface profile_profile_translatorLanguages {
  __typename: "LanguageType";
  id: string;
  name: string;
}

export interface profile_profile {
  __typename: "ProfileType";
  id: any;
  firstname: string;
  lastname: string;
  roles: string;
  currentRole: string;
  eventNotifications: boolean;
  setupCompleted: boolean;
  language: profile_profile_language | null;
  translatorLanguages: profile_profile_translatorLanguages[];
}

export interface profile {
  profile: profile_profile | null;
}

export interface profileVariables {
  username?: string | null;
}
