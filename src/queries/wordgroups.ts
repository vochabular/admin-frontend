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
  query wordGroup($id: ID) {
  wordGroup(id: $id) {
    id
    titleCh
    titleDe
    words {
      wordch {
        exampleSentence
        text
        audio
      }
      wordde {
        exampleSentence
        text
        audio
      }
      worden {
        exampleSentence
        text
        audio
      }
      wordar {
        exampleSentence
        text
        audio
      }
      wordfa {
        exampleSentence
        text
        audio
      }
    }
  }
}
`;