/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getLanguages
// ====================================================

export interface getLanguages_languages {
  __typename: "api_language";
  id: any;
  code: string;
  name: string;
}

export interface getLanguages {
  /**
   * fetch data from the table: "api_language"
   */
  languages: getLanguages_languages[];
}
