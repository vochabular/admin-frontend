import gql from "graphql-tag";

export const PROFILE_PART = gql`
  fragment ProfileParts on ProfileType {
    id
    firstname
    lastname
    roles
    currentRole
    eventNotifications
    setupCompleted
    language: fkLanguage {
      id
      name
    }
    translatorLanguages {
      id
      name
    }
  }
`;

export const GET_DJANGO_PROFILE = gql`
  query profile($username: String) {
    profile(username: $username) {
      ...ProfileParts
    }
  }
  ${PROFILE_PART}
`;

export const UPDATE_DJANGO_PROFILE = gql`
  mutation updateProfile($profile: UpdateProfileInput!) {
    updateProfile(input: $profile) {
      profile {
        ...ProfileParts
      }
    }
  }
  ${PROFILE_PART}
`;
