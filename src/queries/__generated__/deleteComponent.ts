/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteComponent
// ====================================================

export interface deleteComponent_delete_api_component_returning {
  __typename: "api_component";
  id: any;
}

export interface deleteComponent_delete_api_component {
  __typename: "api_component_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: deleteComponent_delete_api_component_returning[];
}

export interface deleteComponent {
  /**
   * delete data from the table: "api_component"
   */
  delete_api_component: deleteComponent_delete_api_component | null;
}

export interface deleteComponentVariables {
  id: any;
}
