/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_wordgroup_insert_input } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: insertWordGroup
// ====================================================

export interface insertWordGroup_insert_api_wordgroup_returning {
  __typename: "api_wordgroup";
  id: any;
  parentChapterId: any;
  titleCh: string;
  titleDe: string;
}

export interface insertWordGroup_insert_api_wordgroup {
  __typename: "api_wordgroup_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: insertWordGroup_insert_api_wordgroup_returning[];
}

export interface insertWordGroup {
  /**
   * insert data into the table: "api_wordgroup"
   */
  insert_api_wordgroup: insertWordGroup_insert_api_wordgroup | null;
}

export interface insertWordGroupVariables {
  input: api_wordgroup_insert_input[];
}
