/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateWordFAInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateFAWord
// ====================================================

export interface updateFAWord_updateFaWord_word {
  __typename: "WordFAType";
  id: string;
  text: string;
  exampleSentence: string | null;
  audio: string | null;
}

export interface updateFAWord_updateFaWord {
  __typename: "UpdateWordFAPayload";
  word: updateFAWord_updateFaWord_word | null;
}

export interface updateFAWord {
  updateFaWord: updateFAWord_updateFaWord | null;
}

export interface updateFAWordVariables {
  input: UpdateWordFAInput;
}
