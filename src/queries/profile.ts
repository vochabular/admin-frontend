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
  }
`;

export const GET_PROFILE = gql`
  query profile($username: String) {
    profile(username: $username) {
      ...ProfileParts
    }
  }
  ${PROFILE_PART}
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($profile: UpdateProfileInput!) {
    updateProfile(input: $profile) {
      profile {
        ...ProfileParts
      }
    }
  }
  ${PROFILE_PART}
`;
