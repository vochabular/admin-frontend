/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CharacterParts
// ====================================================

export interface CharacterParts_book {
  __typename: "api_book";
  id: any;
}

export interface CharacterParts {
  __typename: "api_character";
  id: any;
  formalName: string;
  informalName: string;
  speaker: string | null;
  gender: string | null;
  /**
   * An object relationship
   */
  book: CharacterParts_book | null;
}
