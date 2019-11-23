import gql from "graphql-tag";

export const GET_LANGUAGES = gql`
  query getLanguages {
    languages: api_language {
      id
      name
    }
  }
`;
