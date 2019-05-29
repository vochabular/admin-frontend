import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment UserParts on UserType {
    id
    username
    firstName
    lastName
    email
    isActive
  }
`;
