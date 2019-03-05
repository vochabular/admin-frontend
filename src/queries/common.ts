import gql from "graphql-tag";

export const GET_ENUM = gql`
  query getEnum($type: String!) {
    types: __type(name: $type) {
      enumValues {
        name
      }
    }
  }
`;
