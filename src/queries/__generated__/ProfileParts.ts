/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileParts
// ====================================================

export interface ProfileParts_language {
  __typename: "LanguageType";
  id: string;
  name: string;
}

export interface ProfileParts_translatorLanguages {
  __typename: "LanguageType";
  id: string;
  name: string;
}

export interface ProfileParts {
  __typename: "ProfileType";
  id: any;
  firstname: string;
  lastname: string;
  roles: string;
  currentRole: string;
  eventNotifications: boolean;
  setupCompleted: boolean;
  language: ProfileParts_language | null;
  translatorLanguages: ProfileParts_translatorLanguages[];
}
