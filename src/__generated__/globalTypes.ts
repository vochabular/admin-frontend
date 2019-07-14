/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum CommentContext {
  A = "A",
  C = "C",
  I = "I",
  T = "T",
}

/**
 * An enumeration.
 */
export enum ComponentState {
  C = "C",
  F = "F",
  R = "R",
  T = "T",
  U = "U",
}

/**
 * An enumeration.
 */
export enum ProfileLanguage {
  DE = "DE",
  EN = "EN",
}

export interface ChapterInput {
  titleCH: string;
  titleDE: string;
  fkBelongsToId?: string | null;
  description: string;
  number: number;
  languages: string;
}

export interface CommentInput {
  text: string;
  active: boolean;
  fkAuthorId: string;
  context?: string | null;
  fkComponentId: string;
  fkParentCommentId?: string | null;
}

export interface IntroduceChapterInput {
  chapterData?: ChapterInput | null;
  clientMutationId?: string | null;
}

export interface IntroduceWordGroupInput {
  wordGroupData?: WordGroupInput | null;
  clientMutationId?: string | null;
}

export interface IntroduceWordInput {
  clientMutationId?: string | null;
}

export interface ProfileInput {
  firstname?: string | null;
  lastname?: string | null;
  roles?: string | null;
  currentRole?: string | null;
  language?: string | null;
  translatorLanguages?: string | null;
  eventNotifications?: boolean | null;
  setupCompleted?: boolean | null;
}

export interface TranslatedWordInput {
  text: string;
  audio?: string | null;
  exampleSentence?: string | null;
}

export interface UpdateProfileInput {
  username?: string | null;
  profileData?: ProfileInput | null;
  clientMutationId?: string | null;
}

export interface UpdateWordARInput {
  wordId?: string | null;
  wordData?: TranslatedWordInput | null;
  clientMutationId?: string | null;
}

export interface UpdateWordCHInput {
  wordId?: string | null;
  wordData?: TranslatedWordInput | null;
  clientMutationId?: string | null;
}

export interface UpdateWordDEInput {
  wordId?: string | null;
  wordData?: TranslatedWordInput | null;
  clientMutationId?: string | null;
}

export interface UpdateWordENInput {
  wordId?: string | null;
  wordData?: TranslatedWordInput | null;
  clientMutationId?: string | null;
}

export interface UpdateWordFAInput {
  wordId?: string | null;
  wordData?: TranslatedWordInput | null;
  clientMutationId?: string | null;
}

export interface UpdateWordGroupInput {
  wordGroupId?: string | null;
  wordGroupData?: WordGroupInput | null;
  clientMutationId?: string | null;
}

export interface WordGroupInput {
  fkChapterId: string;
  titleDe: string;
  titleCh: string;
  words?: (string | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
