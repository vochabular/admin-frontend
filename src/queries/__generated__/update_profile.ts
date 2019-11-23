/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_profile
// ====================================================

export interface update_profile_update_api_profile {
  __typename: "api_profile_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface update_profile {
  /**
   * update data of the table: "api_profile"
   */
  update_api_profile: update_profile_update_api_profile | null;
}

export interface update_profileVariables {
  email: string;
}
