/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: WordParts
// ====================================================

export interface WordParts_translations_language {
  __typename: "api_language";
  id: string;
  name: string;
}

export interface WordParts_translations {
  __typename: "api_wordtranslation";
  id: any;
  text: string;
  audio: string | null;
  exampleSentence: string | null;
  /**
   * An object relationship
   */
  language: WordParts_translations_language;
}

export interface WordParts {
  __typename: "api_word";
  id: any;
  /**
   * An array relationship
   */
  translations: WordParts_translations[];
}
