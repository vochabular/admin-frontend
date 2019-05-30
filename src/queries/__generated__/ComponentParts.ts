/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ComponentState } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ComponentParts
// ====================================================

export interface ComponentParts_texts_translations {
  __typename: "TranslationType";
  id: string;
  language: string;
  textField: string;
}

export interface ComponentParts_texts {
  __typename: "TextType";
  id: string;
  translations: (ComponentParts_texts_translations | null)[] | null;
}

export interface ComponentParts {
  __typename: "Component_Type";
  id: string;
  data: string;
  state: ComponentState;
  texts: (ComponentParts_texts | null)[] | null;
}
