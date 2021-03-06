/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: WordgroupParts
// ====================================================

export interface WordgroupParts_words_word_translations_language {
  __typename: "api_language";
  id: string;
  name: string;
}

export interface WordgroupParts_words_word_translations {
  __typename: "api_wordtranslation";
  id: any;
  text: string;
  audio: string | null;
  exampleSentence: string | null;
  /**
   * An object relationship
   */
  language: WordgroupParts_words_word_translations_language;
}

export interface WordgroupParts_words_word {
  __typename: "api_word";
  id: any;
  /**
   * An array relationship
   */
  translations: WordgroupParts_words_word_translations[];
}

export interface WordgroupParts_words {
  __typename: "api_wordgroup_words";
  id: number;
  /**
   * An object relationship
   */
  word: WordgroupParts_words_word;
}

export interface WordgroupParts {
  __typename: "api_wordgroup";
  parentChapterId: any | null;
  id: any;
  /**
   * An array relationship
   */
  words: WordgroupParts_words[];
}
