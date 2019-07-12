import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment UserParts on ProfileType {
    id
    firstname
    lastname
    roles
    language
    translatorLanguages
    eventNotifications
    setupCompleted
  }
`;
