/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { api_wordgroup_set_input } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateWordGroup
// ====================================================

export interface updateWordGroup_update_api_wordgroup_returning {
  __typename: "api_wordgroup";
  id: any;
  titleCh: string;
  titleDe: string;
}

export interface updateWordGroup_update_api_wordgroup {
  __typename: "api_wordgroup_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: updateWordGroup_update_api_wordgroup_returning[];
}

export interface updateWordGroup {
  /**
   * update data of the table: "api_wordgroup"
   */
  update_api_wordgroup: updateWordGroup_update_api_wordgroup | null;
}

export interface updateWordGroupVariables {
  id?: any | null;
  input: api_wordgroup_set_input;
}
