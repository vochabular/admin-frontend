/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateWordENInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateENWord
// ====================================================

export interface updateENWord_updateEnWord_word {
  __typename: "WordENType";
  id: string;
  text: string;
  exampleSentence: string | null;
  audio: string | null;
}

export interface updateENWord_updateEnWord {
  __typename: "UpdateWordENPayload";
  word: updateENWord_updateEnWord_word | null;
}

export interface updateENWord {
  updateEnWord: updateENWord_updateEnWord | null;
}

export interface updateENWordVariables {
  input: UpdateWordENInput;
}
