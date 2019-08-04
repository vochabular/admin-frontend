import gql from "graphql-tag";

export const COMPONENT_TYPE_FRAGMENT = gql`
  fragment ComponentTypeParts on ComponentTypeType {
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
    componentTypes {
      edges {
        node {
          ...ComponentTypeParts
        }
      }
    }
  }
  ${COMPONENT_TYPE_FRAGMENT}
`;
