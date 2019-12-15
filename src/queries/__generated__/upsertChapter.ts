/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_chapter_insert_input } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertChapter
// ====================================================

export interface upsertChapter_insert_api_chapter_returning {
  __typename: "api_chapter";
  id: any;
}

export interface upsertChapter_insert_api_chapter {
  __typename: "api_chapter_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: upsertChapter_insert_api_chapter_returning[];
}

export interface upsertChapter_delete_api_chaptertitle {
  __typename: "api_chaptertitle_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface upsertChapter {
  /**
   * insert data into the table: "api_chapter"
   */
  insert_api_chapter: upsertChapter_insert_api_chapter | null;
  /**
   * delete data from the table: "api_chaptertitle"
   */
  delete_api_chaptertitle: upsertChapter_delete_api_chaptertitle | null;
}

export interface upsertChapterVariables {
  input: api_chapter_insert_input;
  deleteTitleIds: any[];
}
