/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_wordgroup_insert_input } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertWordGroup
// ====================================================

export interface upsertWordGroup_insert_api_wordgroup_returning_words_word_translations_language {
  __typename: "api_language";
  code: string;
  name: string;
}

export interface upsertWordGroup_insert_api_wordgroup_returning_words_word_translations {
  __typename: "api_wordtranslation";
  id: any;
  text: string;
  audio: string | null;
  exampleSentence: string | null;
  /**
   * An object relationship
   */
  language: upsertWordGroup_insert_api_wordgroup_returning_words_word_translations_language;
}

export interface upsertWordGroup_insert_api_wordgroup_returning_words_word {
  __typename: "api_word";
  id: any;
  /**
   * An array relationship
   */
  translations: upsertWordGroup_insert_api_wordgroup_returning_words_word_translations[];
}

export interface upsertWordGroup_insert_api_wordgroup_returning_words {
  __typename: "api_wordgroup_words";
  id: number;
  /**
   * An object relationship
   */
  word: upsertWordGroup_insert_api_wordgroup_returning_words_word;
}

export interface upsertWordGroup_insert_api_wordgroup_returning {
  __typename: "api_wordgroup";
  parentChapterId: any;
  id: any;
  titleCh: string;
  titleDe: string;
  /**
   * An array relationship
   */
  words: upsertWordGroup_insert_api_wordgroup_returning_words[];
}

export interface upsertWordGroup_insert_api_wordgroup {
  __typename: "api_wordgroup_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: upsertWordGroup_insert_api_wordgroup_returning[];
}

export interface upsertWordGroup {
  /**
   * insert data into the table: "api_wordgroup"
   */
  insert_api_wordgroup: upsertWordGroup_insert_api_wordgroup | null;
}

export interface upsertWordGroupVariables {
  input: api_wordgroup_insert_input[];
}
