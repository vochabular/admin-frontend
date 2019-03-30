import gql from "graphql-tag";

export const GET_CHAPTERS = gql`
  query chapters {
    chapters {
      id
      title
      chapterSet {
        id
        title
      }
    }
  }
`;

export const UPSERT_CHAPTER = gql`
  mutation createChapter($input: IntroduceChapterInput!) {
    createChapter(input: $input) {
      chapter {
        title
      }
    }
  }
`;
