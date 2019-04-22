/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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
