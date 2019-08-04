/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_wordtranslation_insert_input } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertWord
// ====================================================

export interface upsertWord_insert_api_word_returning_translations_language {
  __typename: "api_language";
  code: string;
  name: string;
}

export interface upsertWord_insert_api_word_returning_translations {
  __typename: "api_wordtranslation";
  id: any;
  text: string;
  audio: string | null;
  exampleSentence: string | null;
  /**
   * An object relationship
   */
  language: upsertWord_insert_api_word_returning_translations_language;
}

export interface upsertWord_insert_api_word_returning {
  __typename: "api_word";
  id: any;
  /**
   * An array relationship
   */
  translations: upsertWord_insert_api_word_returning_translations[];
}

export interface upsertWord_insert_api_word {
  __typename: "api_word_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: upsertWord_insert_api_word_returning[];
}

export interface upsertWord {
  /**
   * insert data into the table: "api_word"
   */
  insert_api_word: upsertWord_insert_api_word | null;
}

export interface upsertWordVariables {
  wordId: any;
  input: api_wordtranslation_insert_input;
}
