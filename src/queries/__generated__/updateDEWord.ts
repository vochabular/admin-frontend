/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateWordDEInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateDEWord
// ====================================================

export interface updateDEWord_updateDeWord_word {
  __typename: "WordDEType";
  id: string;
  text: string;
  exampleSentence: string | null;
  audio: string | null;
}

export interface updateDEWord_updateDeWord {
  __typename: "UpdateWordDEPayload";
  word: updateDEWord_updateDeWord_word | null;
}

export interface updateDEWord {
  updateDeWord: updateDEWord_updateDeWord | null;
}

export interface updateDEWordVariables {
  input: UpdateWordDEInput;
}
