import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment UserParts on api_profile {
    id
    firstname
    lastname
    current_role
    roles
    language {
      id
    }
    translatorLanguages {
      id
      language {
        id
        name
      }
    }
    eventNotifications: event_notifications
    setupCompleted: setup_completed
  }
`;

export const GET_PROFILE = gql`
  query getProfile($email: String!) {
    profiles: api_profile(where: { user: { email: { _eq: $email } } }) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const UPDATE_PROFILE = gql`
  mutation update_profile($email: String!) {
    update_api_profile(where: { user: { email: { _eq: $email } } }) {
      affected_rows
    }
  }
`;
