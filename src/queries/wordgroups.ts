import gql from "graphql-tag";

export const GET_WORDGROUPS = gql`
  query wordGroups {
    wordGroups {
      id
      titleCh
      titleDe
      fkChapter {
        id
      }
    }
  }
`;

export const GET_WORDGROUP = gql`
  query wordGroups($id: Int!) {
  wordGroups(id: $id) {
    id
    titleCh
    titleDe
    fkChapter {
      id
    }
    memberSet {
      fkWord {
        wordch {
          text
          exampleSentence
          audio
        }
        worden {
          text
          exampleSentence
          audio
        }
        wordde {
          text
          exampleSentence
          audio
        }
        wordfa {
          text
          exampleSentence
          audio
        }
        wordar {
          text
          exampleSentence
          audio
        }
      }
    }
  }
}
`;

export const UPSERT_WORDGROUPS = gql`
  TODO
`;
