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
}

export interface IntroduceChapterInput {
  chapterData?: ChapterInput | null;
  clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
