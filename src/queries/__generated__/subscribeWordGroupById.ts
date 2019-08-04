/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: subscribeWordGroupById
// ====================================================

export interface subscribeWordGroupById_wordGroup_words_word_translations_language {
  __typename: "api_language";
  code: string;
  name: string;
}

export interface subscribeWordGroupById_wordGroup_words_word_translations {
  __typename: "api_wordtranslation";
  id: any;
  text: string;
  audio: string | null;
  exampleSentence: string | null;
  /**
   * An object relationship
   */
  language: subscribeWordGroupById_wordGroup_words_word_translations_language;
}

export interface subscribeWordGroupById_wordGroup_words_word {
  __typename: "api_word";
  id: any;
  /**
   * An array relationship
   */
  translations: subscribeWordGroupById_wordGroup_words_word_translations[];
}

export interface subscribeWordGroupById_wordGroup_words {
  __typename: "api_wordgroup_words";
  id: number;
  /**
   * An object relationship
   */
  word: subscribeWordGroupById_wordGroup_words_word;
}

export interface subscribeWordGroupById_wordGroup {
  __typename: "api_wordgroup";
  parentChapterId: any;
  id: any;
  titleCh: string;
  titleDe: string;
  /**
   * An array relationship
   */
  words: subscribeWordGroupById_wordGroup_words[];
}

export interface subscribeWordGroupById {
  /**
   * fetch data from the table: "api_wordgroup" using primary key columns
   */
  wordGroup: subscribeWordGroupById_wordGroup | null;
}

export interface subscribeWordGroupByIdVariables {
  id: any;
}
