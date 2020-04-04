/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: chapters_wordGroups
// ====================================================

export interface chapters_wordGroups_chapters_languages_language {
  __typename: "api_language";
  id: string;
}

export interface chapters_wordGroups_chapters_languages {
  __typename: "api_chaptertitle";
  id: any;
  /**
   * An object relationship
   */
  language: chapters_wordGroups_chapters_languages_language;
}

export interface chapters_wordGroups_chapters_parentChapter {
  __typename: "api_chapter";
  id: any;
  number: number;
  description: string;
}

export interface chapters_wordGroups_chapters_subChapters {
  __typename: "api_chapter";
  id: any;
  description: string;
}

export interface chapters_wordGroups_chapters_wordgroups_words_word_translations_language {
  __typename: "api_language";
  id: string;
  name: string;
}

export interface chapters_wordGroups_chapters_wordgroups_words_word_translations {
  __typename: "api_wordtranslation";
  id: any;
  text: string;
  audio: string | null;
  exampleSentence: string | null;
  /**
   * An object relationship
   */
  language: chapters_wordGroups_chapters_wordgroups_words_word_translations_language;
}

export interface chapters_wordGroups_chapters_wordgroups_words_word {
  __typename: "api_word";
  id: any;
  /**
   * An array relationship
   */
  translations: chapters_wordGroups_chapters_wordgroups_words_word_translations[];
}

export interface chapters_wordGroups_chapters_wordgroups_words {
  __typename: "api_wordgroup_words";
  id: number;
  /**
   * An object relationship
   */
  word: chapters_wordGroups_chapters_wordgroups_words_word;
}

export interface chapters_wordGroups_chapters_wordgroups {
  __typename: "api_wordgroup";
  parentChapterId: any | null;
  id: any;
  /**
   * An array relationship
   */
  words: chapters_wordGroups_chapters_wordgroups_words[];
}

export interface chapters_wordGroups_chapters {
  __typename: "api_chapter";
  id: any;
  number: number;
  description: string;
  created: any;
  updated: any;
  /**
   * An array relationship
   */
  languages: chapters_wordGroups_chapters_languages[];
  /**
   * An object relationship
   */
  parentChapter: chapters_wordGroups_chapters_parentChapter | null;
  /**
   * An array relationship
   */
  subChapters: chapters_wordGroups_chapters_subChapters[];
  /**
   * An array relationship
   */
  wordgroups: chapters_wordGroups_chapters_wordgroups[];
}

export interface chapters_wordGroups {
  /**
   * fetch data from the table: "api_chapter"
   */
  chapters: chapters_wordGroups_chapters[];
}
