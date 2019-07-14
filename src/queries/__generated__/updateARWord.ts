/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateWordARInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateARWord
// ====================================================

export interface updateARWord_updateArWord_word {
  __typename: "WordARType";
  id: string;
  text: string;
  exampleSentence: string | null;
  audio: string | null;
}

export interface updateARWord_updateArWord {
  __typename: "UpdateWordARPayload";
  word: updateARWord_updateArWord_word | null;
}

export interface updateARWord {
  updateArWord: updateARWord_updateArWord | null;
}

export interface updateARWordVariables {
  input: UpdateWordARInput;
}
