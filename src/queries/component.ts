import gql from "graphql-tag";

import { COMPONENT_TYPE_FRAGMENT } from "./componentTypes";

export const COMPONENT_PART = gql`
  fragment ComponentParts on api_component {
    id
    data
    state
    position: order_in_chapter
    type {
      ...ComponentTypeParts
    }
    texts {
      id
      translatable
      translations {
        id
        text_field
        valid
        language {
          id
          code
        }
      }
    }
    media {
      id
    }
  }
  ${COMPONENT_TYPE_FRAGMENT}
`;

export const GET_LOCAL_SELECTED_COMPONENT_ID = gql`
  query getSelectedComponentId {
    selectedComponentId @client
  }
`;

/**
 * Local query (would replace redux...):
 * https://www.apollographql.com/docs/react/essentials/local-state/
 * Especially, "Using @client fields as variables"!
 */
export const GET_SELECTED_COMPONENT = gql`
  query getSelectedComponent($id: uuid!) {
    selectedComponentId @client @export(as: "id")
    component: api_component_by_pk(id: $id) {
      ...ComponentParts @client
    }
    languages: api_language {
      id
      code
      name
    }
  }
  ${COMPONENT_PART}
`;

export const CREATE_COMPONENT = gql`
  mutation createComponent($input: api_component_insert_input!) {
    insert_api_component(objects: [$input]) {
      returning {
        ...ComponentParts
      }
    }
  }
  ${COMPONENT_PART}
`;

export const UPDATE_COMPONENT = gql`
  mutation updateComponent(
    $componentId: uuid!
    $componentData: api_component_set_input!
    $textData: [api_text_insert_input!]!
    $textUpdateColumns: [api_text_update_column!]!
    $translationData: [api_translation_insert_input!]!
    $translationUpdateColumns: [api_translation_update_column!]!
    $deleteTextIds: [uuid!]!
    $deleteTranslationIds: [uuid!]!
  ) {
    update_api_component(
      _set: $componentData
      where: { id: { _eq: $componentId } }
    ) {
      returning {
        ...ComponentParts
      }
    }
    insert_api_text(
      objects: $textData
      on_conflict: {
        constraint: api_text_pkey
        update_columns: $textUpdateColumns
      }
    ) {
      affected_rows
    }
    insert_api_translation(
      objects: $translationData
      on_conflict: {
        constraint: api_translation_pkey
        update_columns: $translationUpdateColumns
      }
    ) {
      affected_rows
    }
    delete_api_text(where: { id: { _in: $deleteTextIds } }) {
      affected_rows
    }
    delete_api_translation(where: { id: { _in: $deleteTranslationIds } }) {
      affected_rows
    }
  }
  ${COMPONENT_PART}
`;

export const DELETE_COMPONENT = gql`
  mutation deleteComponent($id: uuid!) {
    delete_api_component(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
