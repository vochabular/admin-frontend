/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: wordGroup
// ====================================================

export interface wordGroup_wordGroup_words_wordch {
  __typename: "WordCHType";
  exampleSentence: string | null;
  text: string;
  audio: string | null;
}

export interface wordGroup_wordGroup_words_wordde {
  __typename: "WordDEType";
  exampleSentence: string | null;
  text: string;
  audio: string | null;
}

export interface wordGroup_wordGroup_words_worden {
  __typename: "WordENType";
  exampleSentence: string | null;
  text: string;
  audio: string | null;
}

export interface wordGroup_wordGroup_words_wordar {
  __typename: "WordARType";
  exampleSentence: string | null;
  text: string;
  audio: string | null;
}

export interface wordGroup_wordGroup_words_wordfa {
  __typename: "WordFAType";
  exampleSentence: string | null;
  text: string;
  audio: string | null;
}

export interface wordGroup_wordGroup_words {
  __typename: "WordType";
  wordch: wordGroup_wordGroup_words_wordch | null;
  wordde: wordGroup_wordGroup_words_wordde | null;
  worden: wordGroup_wordGroup_words_worden | null;
  wordar: wordGroup_wordGroup_words_wordar | null;
  wordfa: wordGroup_wordGroup_words_wordfa | null;
}

export interface wordGroup_wordGroup {
  __typename: "WordGroupType";
  id: string;
  titleCh: string;
  titleDe: string;
  words: (wordGroup_wordGroup_words | null)[] | null;
}

export interface wordGroup {
  wordGroup: wordGroup_wordGroup | null;
}

export interface wordGroupVariables {
  id?: string | null;
}
