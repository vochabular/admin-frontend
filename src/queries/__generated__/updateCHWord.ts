/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateWordCHInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCHWord
// ====================================================

export interface updateCHWord_updateChWord_word {
  __typename: "WordCHType";
  id: string;
  text: string;
  exampleSentence: string | null;
  audio: string | null;
}

export interface updateCHWord_updateChWord {
  __typename: "UpdateWordCHPayload";
  word: updateCHWord_updateChWord_word | null;
}

export interface updateCHWord {
  updateChWord: updateCHWord_updateChWord | null;
}

export interface updateCHWordVariables {
  input: UpdateWordCHInput;
}
