import gql from "graphql-tag";

export const COMPONENT_TYPE_FRAGMENT = gql`
  fragment ComponentTypeParts on ComponentTypeType {
    id
    name
    schema
  }
`;

export const GET_ALL_COMPONENTTYPES = gql`
  query getAllComponentTypes {
    componentTypes {
      ...ComponentTypeParts
    }
  }
  ${COMPONENT_TYPE_FRAGMENT}
`;
