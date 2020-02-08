/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: getCharactersByIds
// ====================================================

export interface getCharactersByIds_api_character_book {
  __typename: "api_book";
  id: any;
}

export interface getCharactersByIds_api_character {
  __typename: "api_character";
  id: any;
  formalName: string;
  informalName: string;
  speaker: string | null;
  gender: string | null;
  /**
   * An object relationship
   */
  book: getCharactersByIds_api_character_book | null;
}

export interface getCharactersByIds {
  /**
   * fetch data from the table: "api_character"
   */
  api_character: getCharactersByIds_api_character[];
}

export interface getCharactersByIdsVariables {
  ids: any[];
}
