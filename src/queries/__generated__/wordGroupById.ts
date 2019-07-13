/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: wordGroupById
// ====================================================

export interface wordGroupById_wordGroup_words_wordch {
  __typename: "WordCHType";
  id: string;
  exampleSentence: string | null;
  text: string;
  audio: string | null;
}

export interface wordGroupById_wordGroup_words_wordde {
  __typename: "WordDEType";
  id: string;
  exampleSentence: string | null;
  text: string;
  audio: string | null;
}

export interface wordGroupById_wordGroup_words_worden {
  __typename: "WordENType";
  id: string;
  exampleSentence: string | null;
  text: string;
  audio: string | null;
}

export interface wordGroupById_wordGroup_words_wordar {
  __typename: "WordARType";
  id: string;
  exampleSentence: string | null;
  text: string;
  audio: string | null;
}

export interface wordGroupById_wordGroup_words_wordfa {
  __typename: "WordFAType";
  id: string;
  exampleSentence: string | null;
  text: string;
  audio: string | null;
}

export interface wordGroupById_wordGroup_words {
  __typename: "WordType";
  id: string;
  wordch: wordGroupById_wordGroup_words_wordch | null;
  wordde: wordGroupById_wordGroup_words_wordde | null;
  worden: wordGroupById_wordGroup_words_worden | null;
  wordar: wordGroupById_wordGroup_words_wordar | null;
  wordfa: wordGroupById_wordGroup_words_wordfa | null;
}

export interface wordGroupById_wordGroup {
  __typename: "WordGroupType";
  /**
   * The ID of the object.
   */
  id: string;
  titleCh: string;
  titleDe: string;
  words: (wordGroupById_wordGroup_words | null)[] | null;
}

export interface wordGroupById {
  wordGroup: wordGroupById_wordGroup | null;
}

export interface wordGroupByIdVariables {
  id?: string | null;
}
