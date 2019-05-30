/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ComponentState } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: chapterById
// ====================================================

export interface chapterById_chapter_parentChapter {
  __typename: "ChapterType";
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface chapterById_chapter_chapterSet {
  __typename: "ChapterType";
  id: string;
  title: string;
  description: string;
}

export interface chapterById_chapter_subChapters_parentChapter {
  __typename: "ChapterType";
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface chapterById_chapter_subChapters_chapterSet {
  __typename: "ChapterType";
  id: string;
  title: string;
  description: string;
}

export interface chapterById_chapter_subChapters {
  __typename: "ChapterType";
  id: string;
  number: number;
  title: string;
  description: string;
  parentChapter: chapterById_chapter_subChapters_parentChapter | null;
  chapterSet: (chapterById_chapter_subChapters_chapterSet | null)[] | null;
}

export interface chapterById_chapter_components_texts_translations {
  __typename: "TranslationType";
  id: string;
  language: string;
  textField: string;
}

export interface chapterById_chapter_components_texts {
  __typename: "TextType";
  id: string;
  translations: (chapterById_chapter_components_texts_translations | null)[] | null;
}

export interface chapterById_chapter_components {
  __typename: "Component_Type";
  id: string;
  data: string;
  state: ComponentState;
  texts: (chapterById_chapter_components_texts | null)[] | null;
}

export interface chapterById_chapter {
  __typename: "ChapterType";
  id: string;
  number: number;
  title: string;
  description: string;
  parentChapter: chapterById_chapter_parentChapter | null;
  chapterSet: (chapterById_chapter_chapterSet | null)[] | null;
  subChapters: (chapterById_chapter_subChapters | null)[] | null;
  components: (chapterById_chapter_components | null)[] | null;
}

export interface chapterById {
  chapter: chapterById_chapter | null;
}

export interface chapterByIdVariables {
  id?: number | null;
}
