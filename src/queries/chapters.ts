import gql from "graphql-tag";

export const GET_CHAPTERS = gql`
  {
    allChapters {
      id
      title
    }
  }
`;
