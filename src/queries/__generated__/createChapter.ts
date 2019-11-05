/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_chapter_insert_input } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createChapter
// ====================================================

export interface createChapter_insert_api_chapter_returning {
  __typename: "api_chapter";
  id: any;
}

export interface createChapter_insert_api_chapter {
  __typename: "api_chapter_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: createChapter_insert_api_chapter_returning[];
}

export interface createChapter {
  /**
   * insert data into the table: "api_chapter"
   */
  insert_api_chapter: createChapter_insert_api_chapter | null;
}

export interface createChapterVariables {
  input: api_chapter_insert_input;
}
