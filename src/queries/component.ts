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
      placeholder
      translatable
      translations {
        id
        text_field
        valid
        language {
          id
        }
      }
    }
    media {
      id
      type
      url
    }
  }
  ${COMPONENT_TYPE_FRAGMENT}
`;

/**
 * Local query (replaces redux...):
 * https://www.apollographql.com/docs/react/essentials/local-state/
 * Especially, "Using @client fields as variables"!
 * selectedComponentId @client @export(as: "id")
 */
export const GET_LOCAL_EDITOR_LANGUAGE = gql`
  query getLocalEditorLanguage {
    contentEditorLanguage @client
  }
`;

export const GET_LOCAL_SELECTED_COMPONENT_ID = gql`
  query getLocalSelectedComponent {
    selectedComponentId @client
    currentChapterId @client
  }
`;

export const GET_LOCAL_EDITOR_ROLE = gql`
  query getLocalEditorRole {
    contentEditorRole @client
  }
`;

export const GET_SELECTED_COMPONENT = gql`
  query getSelectedComponent($id: uuid!) {
    component: api_component_by_pk(id: $id) {
      ...ComponentParts
    }
    languages: api_language {
      id
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
    $mediaData: [api_media_insert_input!]!
    $mediaUpdateColumns: [api_media_update_column!]!
    $deleteTextIds: [uuid!]!
    $deleteTranslationIds: [uuid!]!
    $deleteMediaIds: [uuid!]!
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
    insert_api_media(
      objects: $mediaData
      on_conflict: {
        constraint: api_media_pkey
        update_columns: $mediaUpdateColumns
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
    delete_api_media(where: { id: { _in: $deleteMediaIds } }) {
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
