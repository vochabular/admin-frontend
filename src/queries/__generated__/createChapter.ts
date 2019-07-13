/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { IntroduceChapterInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createChapter
// ====================================================

export interface createChapter_createChapter_chapter_fkBelongsTo {
  __typename: "ChapterType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface createChapter_createChapter_chapter {
  __typename: "ChapterType";
  number: number;
  titleCH: string;
  titleDE: string;
  description: string;
  fkBelongsTo: createChapter_createChapter_chapter_fkBelongsTo | null;
}

export interface createChapter_createChapter {
  __typename: "IntroduceChapterPayload";
  chapter: createChapter_createChapter_chapter | null;
}

export interface createChapter {
  createChapter: createChapter_createChapter | null;
}

export interface createChapterVariables {
  input: IntroduceChapterInput;
}
