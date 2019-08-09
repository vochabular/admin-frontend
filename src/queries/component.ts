import gql from "graphql-tag";

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
