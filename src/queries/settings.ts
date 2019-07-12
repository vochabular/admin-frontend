import gql from "graphql-tag";

export const GET_SETTINGS = gql`
  query profile($username: String) {
    profile(username: $username) {
      id
      firstname
      lastname
      roles
      currentRole
      language
      translatorLanguages
      eventNotifications
      setupCompleted
    }
  }
`;

export const UPDATE_SETTINGS = gql`
  mutation updateSettings($settings: Settings) {
    updateSettings(settings: $settings) @client {
      userName
      currentRole
      language
      translatorLanguages
      receiveEventNotifications
      hasCompletedSetup
    }
  }
`;
