/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: getAllCharacters
// ====================================================

export interface getAllCharacters_characters_book {
  __typename: "api_book";
  id: any;
}

export interface getAllCharacters_characters {
  __typename: "api_character";
  id: any;
  formalName: string;
  informalName: string;
  speaker: string | null;
  gender: string | null;
  /**
   * An object relationship
   */
  book: getAllCharacters_characters_book | null;
}

export interface getAllCharacters {
  /**
   * fetch data from the table: "api_character"
   */
  characters: getAllCharacters_characters[];
}
