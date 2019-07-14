/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateWordGroupInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateWordGroup
// ====================================================

export interface updateWordGroup_updateWordGroup_wordGroup {
  __typename: "WordGroupType";
  /**
   * The ID of the object.
   */
  id: string;
  titleCh: string;
  titleDe: string;
}

export interface updateWordGroup_updateWordGroup {
  __typename: "UpdateWordGroupPayload";
  wordGroup: updateWordGroup_updateWordGroup_wordGroup | null;
}

export interface updateWordGroup {
  updateWordGroup: updateWordGroup_updateWordGroup | null;
}

export interface updateWordGroupVariables {
  input: UpdateWordGroupInput;
}
