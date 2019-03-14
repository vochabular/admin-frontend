import gql from "graphql-tag";

export const GET_CHAPTERS = gql`
  {
    chapters {
      id
      title
    }
  }
`;
