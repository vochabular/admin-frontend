/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: getCharacterById
// ====================================================

export interface getCharacterById_character_book {
  __typename: "api_book";
  id: any;
}

export interface getCharacterById_character {
  __typename: "api_character";
  id: any;
  formalName: string;
  informalName: string;
  speaker: string | null;
  gender: string | null;
  /**
   * An object relationship
   */
  book: getCharacterById_character_book | null;
}

export interface getCharacterById {
  /**
   * fetch data from the table: "api_character" using primary key columns
   */
  character: getCharacterById_character | null;
}

export interface getCharacterByIdVariables {
  id: any;
}
