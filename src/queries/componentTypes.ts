import gql from "graphql-tag";

export const COMPONENT_TYPE_FRAGMENT = gql`
  fragment ComponentTypeParts on api_componenttype {
    id
    name
    label
    icon
    base
    schema
    created
    updated
  }
`;

export const GET_ALL_COMPONENTTYPES = gql`
  query getAllComponentTypes {
    types: api_componenttype {
      ...ComponentTypeParts
    }
  }
  ${COMPONENT_TYPE_FRAGMENT}
`;
