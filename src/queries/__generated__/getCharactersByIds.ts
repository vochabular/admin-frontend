/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: getCharactersByIds
// ====================================================

export interface getCharactersByIds_characters_book {
  __typename: "api_book";
  id: any;
}

export interface getCharactersByIds_characters {
  __typename: "api_character";
  id: any;
  formalName: string;
  informalName: string;
  speaker: string | null;
  gender: string | null;
  /**
   * An object relationship
   */
  book: getCharactersByIds_characters_book | null;
}

export interface getCharactersByIds {
  /**
   * fetch data from the table: "api_character"
   */
  characters: getCharactersByIds_characters[];
}

export interface getCharactersByIdsVariables {
  ids: any[];
}
