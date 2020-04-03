/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: subscribeWordGroups
// ====================================================

export interface subscribeWordGroups_wordGroups_words_word_translations_language {
  __typename: "api_language";
  id: string;
  name: string;
}

export interface subscribeWordGroups_wordGroups_words_word_translations {
  __typename: "api_wordtranslation";
  id: any;
  text: string;
  audio: string | null;
  exampleSentence: string | null;
  /**
   * An object relationship
   */
  language: subscribeWordGroups_wordGroups_words_word_translations_language;
}

export interface subscribeWordGroups_wordGroups_words_word {
  __typename: "api_word";
  id: any;
  /**
   * An array relationship
   */
  translations: subscribeWordGroups_wordGroups_words_word_translations[];
}

export interface subscribeWordGroups_wordGroups_words {
  __typename: "api_wordgroup_words";
  id: number;
  /**
   * An object relationship
   */
  word: subscribeWordGroups_wordGroups_words_word;
}

export interface subscribeWordGroups_wordGroups {
  __typename: "api_wordgroup";
  parentChapterId: any | null;
  id: any;
  /**
   * An array relationship
   */
  words: subscribeWordGroups_wordGroups_words[];
}

export interface subscribeWordGroups {
  /**
   * fetch data from the table: "api_wordgroup"
   */
  wordGroups: subscribeWordGroups_wordGroups[];
}
