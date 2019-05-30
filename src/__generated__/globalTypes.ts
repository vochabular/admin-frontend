/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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

export interface ChapterInput {
  title: string;
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
