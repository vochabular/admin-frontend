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
  description: string;
  fkBelongsToId?: string | null;
  languages: string;
  number: number;
  titleCH: string;
  titleDE: string;
}

export interface CommentInput {
  active: boolean;
  context?: string | null;
  fkAuthorId: string;
  fkComponentId: string;
  fkParentCommentId?: string | null;
  text: string;
}

export interface IntroduceChapterInput {
  chapterData?: ChapterInput | null;
  clientMutationId?: string | null;
}

export interface ProfileInput {
  currentRole?: string | null;
  eventNotifications?: boolean | null;
  firstname?: string | null;
  language?: string | null;
  lastname?: string | null;
  roles?: string | null;
  setupCompleted?: boolean | null;
  translatorLanguages?: string | null;
}

export interface UpdateProfileInput {
  clientMutationId?: string | null;
  profileData?: ProfileInput | null;
  username?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
