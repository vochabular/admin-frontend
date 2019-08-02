/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getWordGroups
// ====================================================

export interface getWordGroups_wordGroups_words_word_translations_language {
  __typename: "api_language";
  code: string;
  name: string;
}

export interface getWordGroups_wordGroups_words_word_translations {
  __typename: "api_wordtranslation";
  id: any;
  text: string;
  audio: string | null;
  exampleSentence: string | null;
  /**
   * An object relationship
   */
  language: getWordGroups_wordGroups_words_word_translations_language;
}

export interface getWordGroups_wordGroups_words_word {
  __typename: "api_word";
  id: any;
  /**
   * An array relationship
   */
  translations: getWordGroups_wordGroups_words_word_translations[];
}

export interface getWordGroups_wordGroups_words {
  __typename: "api_wordgroup_words";
  id: number;
  /**
   * An object relationship
   */
  word: getWordGroups_wordGroups_words_word;
}

export interface getWordGroups_wordGroups {
  __typename: "api_wordgroup";
  parentChapterId: any;
  id: any;
  titleCh: string;
  titleDe: string;
  /**
   * An array relationship
   */
  words: getWordGroups_wordGroups_words[];
}

export interface getWordGroups {
  /**
   * fetch data from the table: "api_wordgroup"
   */
  wordGroups: getWordGroups_wordGroups[];
}
