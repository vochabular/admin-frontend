/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_wordgroup_insert_input } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertWordGroup
// ====================================================

export interface upsertWordGroup_insert_api_wordgroup_returning {
  __typename: "api_wordgroup";
  id: any;
  parentChapterId: any;
  titleCh: string;
  titleDe: string;
}

export interface upsertWordGroup_insert_api_wordgroup {
  __typename: "api_wordgroup_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: upsertWordGroup_insert_api_wordgroup_returning[];
}

export interface upsertWordGroup {
  /**
   * insert data into the table: "api_wordgroup"
   */
  insert_api_wordgroup: upsertWordGroup_insert_api_wordgroup | null;
}

export interface upsertWordGroupVariables {
  input: api_wordgroup_insert_input[];
}
