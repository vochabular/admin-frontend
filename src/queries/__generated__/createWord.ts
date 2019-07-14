/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { IntroduceWordInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createWord
// ====================================================

export interface createWord_createWord_word {
  __typename: "WordType";
  id: string;
}

export interface createWord_createWord {
  __typename: "IntroduceWordPayload";
  word: createWord_createWord_word | null;
}

export interface createWord {
  createWord: createWord_createWord | null;
}

export interface createWordVariables {
  input: IntroduceWordInput;
}
