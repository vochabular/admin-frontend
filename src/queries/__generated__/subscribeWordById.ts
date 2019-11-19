/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: subscribeWordById
// ====================================================

export interface subscribeWordById_word_translations_language {
  __typename: "api_language";
  code: string;
  name: string;
}

export interface subscribeWordById_word_translations {
  __typename: "api_wordtranslation";
  id: any;
  text: string;
  audio: string | null;
  exampleSentence: string | null;
  /**
   * An object relationship
   */
  language: subscribeWordById_word_translations_language;
}

export interface subscribeWordById_word {
  __typename: "api_word";
  id: any;
  /**
   * An array relationship
   */
  translations: subscribeWordById_word_translations[];
}

export interface subscribeWordById {
  /**
   * fetch data from the table: "api_word" using primary key columns
   */
  word: subscribeWordById_word | null;
}

export interface subscribeWordByIdVariables {
  id: any;
}
