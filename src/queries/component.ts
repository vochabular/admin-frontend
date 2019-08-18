import gql from "graphql-tag";
import { COMPONENT_PART } from "./chapters";

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
  }
  ${COMPONENT_PART}
`;

export const CREATE_COMPONENT = gql`
  mutation createComponent($input: api_component_insert_input!) {
    insert_api_component(objects: [$input]) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_COMPONENT = gql`
  mutation updateComponent($id: uuid!, $data: api_component_set_input!) {
    update_api_component(_set: $data, where: { id: { _eq: $id } }) {
      returning {
        id
        order_in_chapter
      }
    }
  }
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
