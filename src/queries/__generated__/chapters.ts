/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ComponentState } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: chapters
// ====================================================

export interface chapters_chapters_parentChapter {
  __typename: "ChapterType";
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface chapters_chapters_chapterSet {
  __typename: "ChapterType";
  id: string;
  title: string;
  description: string;
}

export interface chapters_chapters_components_texts_translations {
  __typename: "TranslationType";
  id: string;
  language: string;
  textField: string;
}

export interface chapters_chapters_components_texts {
  __typename: "TextType";
  id: string;
  translations: (chapters_chapters_components_texts_translations | null)[] | null;
}

export interface chapters_chapters_components {
  __typename: "Component_Type";
  id: string;
  data: string;
  state: ComponentState;
  texts: (chapters_chapters_components_texts | null)[] | null;
}

export interface chapters_chapters {
  __typename: "ChapterType";
  id: string;
  number: number;
  title: string;
  description: string;
  parentChapter: chapters_chapters_parentChapter | null;
  chapterSet: (chapters_chapters_chapterSet | null)[] | null;
  components: (chapters_chapters_components | null)[] | null;
}

export interface chapters {
  chapters: (chapters_chapters | null)[] | null;
}
