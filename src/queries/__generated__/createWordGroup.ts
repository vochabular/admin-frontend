/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { IntroduceWordGroupInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createWordGroup
// ====================================================

export interface createWordGroup_createWordGroup_wordGroup {
  __typename: "WordGroupType";
  /**
   * The ID of the object.
   */
  id: string;
  titleCh: string;
  titleDe: string;
}

export interface createWordGroup_createWordGroup {
  __typename: "IntroduceWordGroupPayload";
  wordGroup: createWordGroup_createWordGroup_wordGroup | null;
}

export interface createWordGroup {
  createWordGroup: createWordGroup_createWordGroup | null;
}

export interface createWordGroupVariables {
  input: IntroduceWordGroupInput;
}
