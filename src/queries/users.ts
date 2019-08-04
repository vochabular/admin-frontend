import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment UserParts on api_profile {
    id
    firstname
    lastname
    roles
    language
    translatorLanguages: translator_languages
    eventNotifications: event_notifications
    setupCompleted: setup_completed
  }
`;
