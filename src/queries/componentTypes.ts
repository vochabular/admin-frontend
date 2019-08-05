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

export const GET_COMPONENTTYPE_BY_ID = gql`
  query getComponentTypeById($id: uuid!) {
    type: api_componenttype_by_pk(id: $id) {
      ...ComponentTypeParts
      children {
        ...ComponentTypeParts
      }
    }
  }
  ${COMPONENT_TYPE_FRAGMENT}
`;
