/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserParts
// ====================================================

export interface UserParts_language {
  __typename: "api_language";
  id: string;
}

export interface UserParts_translatorLanguages_language {
  __typename: "api_language";
  id: string;
  name: string;
}

export interface UserParts_translatorLanguages {
  __typename: "api_profile_translator_languages";
  id: number;
  /**
   * An object relationship
   */
  language: UserParts_translatorLanguages_language;
}

export interface UserParts {
  __typename: "api_profile";
  id: any;
  firstname: string;
  lastname: string;
  current_role: string;
  roles: string;
  /**
   * An object relationship
   */
  language: UserParts_language | null;
  /**
   * An array relationship
   */
  translatorLanguages: UserParts_translatorLanguages[];
  eventNotifications: boolean;
  setupCompleted: boolean;
}
