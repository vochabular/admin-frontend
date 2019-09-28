/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: subscribeChaptersWordGroupsByChapterId
// ====================================================

export interface subscribeChaptersWordGroupsByChapterId_chapters_wordgroups_words_word_translations_language {
  __typename: "api_language";
  code: string;
  name: string;
}

export interface subscribeChaptersWordGroupsByChapterId_chapters_wordgroups_words_word_translations {
  __typename: "api_wordtranslation";
  id: any;
  text: string;
  audio: string | null;
  exampleSentence: string | null;
  /**
   * An object relationship
   */
  language: subscribeChaptersWordGroupsByChapterId_chapters_wordgroups_words_word_translations_language;
}

export interface subscribeChaptersWordGroupsByChapterId_chapters_wordgroups_words_word {
  __typename: "api_word";
  id: any;
  /**
   * An array relationship
   */
  translations: subscribeChaptersWordGroupsByChapterId_chapters_wordgroups_words_word_translations[];
}

export interface subscribeChaptersWordGroupsByChapterId_chapters_wordgroups_words {
  __typename: "api_wordgroup_words";
  id: number;
  /**
   * An object relationship
   */
  word: subscribeChaptersWordGroupsByChapterId_chapters_wordgroups_words_word;
}

export interface subscribeChaptersWordGroupsByChapterId_chapters_wordgroups {
  __typename: "api_wordgroup";
  parentChapterId: any;
  id: any;
  titleCh: string;
  titleDe: string;
  /**
   * An array relationship
   */
  words: subscribeChaptersWordGroupsByChapterId_chapters_wordgroups_words[];
}

export interface subscribeChaptersWordGroupsByChapterId_chapters {
  __typename: "api_chapter";
  id: any;
  titleDE: string;
  titleCH: string;
  /**
   * An array relationship
   */
  wordgroups: subscribeChaptersWordGroupsByChapterId_chapters_wordgroups[];
  parentChapter: any | null;
}

export interface subscribeChaptersWordGroupsByChapterId {
  /**
   * fetch data from the table: "api_chapter" using primary key columns
   */
  chapters: subscribeChaptersWordGroupsByChapterId_chapters | null;
}

export interface subscribeChaptersWordGroupsByChapterIdVariables {
  id: any;
}
