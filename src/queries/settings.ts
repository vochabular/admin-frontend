import gql from "graphql-tag";

export const GET_SETTINGS = gql`
  query getSettings {
    settings @client {
      userName
      language
      translatorLanguages
      receiveEventNotifications
      currentRole
      hasCompletedSetup
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
