import gql from "graphql-tag";

export const GET_PROFILE = gql`
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

export const UPDATE_PROFILE = gql`
  mutation updateProfile($profile: UpdateProfileInput!) {
    updateProfile(input: $profile) {
      profile {
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
  }
`;
