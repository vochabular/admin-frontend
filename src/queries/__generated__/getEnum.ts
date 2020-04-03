/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getEnum
// ====================================================

export interface getEnum_types_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface getEnum_types {
  __typename: "__Type";
  enumValues: getEnum_types_enumValues[] | null;
}

export interface getEnum {
  types: getEnum_types | null;
}

export interface getEnumVariables {
  type: string;
}
