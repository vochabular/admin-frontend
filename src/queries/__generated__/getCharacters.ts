/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: getCharacters
// ====================================================

export interface getCharacters_characters_book {
  __typename: "api_book";
  id: any;
}

export interface getCharacters_characters {
  __typename: "api_character";
  id: any;
  formalName: string;
  informalName: string;
  speaker: string | null;
  gender: string | null;
  /**
   * An object relationship
   */
  book: getCharacters_characters_book | null;
}

export interface getCharacters {
  /**
   * fetch data from the table: "api_character"
   */
  characters: getCharacters_characters[];
}
