/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getProfile
// ====================================================

export interface getProfile_profiles_language {
  __typename: "api_language";
  id: string;
}

export interface getProfile_profiles_translatorLanguages_language {
  __typename: "api_language";
  id: string;
  name: string;
}

export interface getProfile_profiles_translatorLanguages {
  __typename: "api_profile_translator_languages";
  id: number;
  /**
   * An object relationship
   */
  language: getProfile_profiles_translatorLanguages_language;
}

export interface getProfile_profiles {
  __typename: "api_profile";
  id: any;
  firstname: string;
  lastname: string;
  current_role: string;
  roles: string;
  /**
   * An object relationship
   */
  language: getProfile_profiles_language | null;
  /**
   * An array relationship
   */
  translatorLanguages: getProfile_profiles_translatorLanguages[];
  eventNotifications: boolean;
  setupCompleted: boolean;
}

export interface getProfile {
  /**
   * fetch data from the table: "api_profile"
   */
  profiles: getProfile_profiles[];
}

export interface getProfileVariables {
  email: string;
}
