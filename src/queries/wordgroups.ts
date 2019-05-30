import gql from "graphql-tag";

export const GET_WORDGROUPS = gql`
  query wordGroups {
      wordGroups {
        edges {
          node {
            id
            titleCh
            titleDe
            fkChapter {
              id
            }
          }
        }
      }
    }
`;

export const GET_WORDGROUP_BY_ID = gql`
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

export const INSERT_WORDGROUP = gql`
  mutation createWordGroup($input: IntroduceWordGroupInput!) {
      createWordGroup(input: $input) {
        wordGroup {
          id
          titleCh
          titleDe
        }
      }
    }
`;

export const UPDATE_WORDGROUP = gql`
  mutation updateWordGroup($input: UpdateWordGroupInput!) {
      updateWordGroup(input: $input) {
        wordGroup {
          id
          titleCh
          titleDe
        }
      }
    }
`;

export const CREATE_WORD = gql`
    mutation createWord($input: IntroduceWordInput!) {
      createWord(input: $input) {
        word {
          id
        }
      }
    }
`;

export const UPDATE_DE_WORD = gql`
    mutation updateDEWord($input: UpdateWordDEInput!) {
      updateDeWord(input: $input) {
        word {
          id
          text
          exampleSentence
          audio
        }
      }
    }
`;

export const UPDATE_CH_WORD = gql`
    mutation updateCHWord($input: UpdateWordCHInput!) {
      updateChWord(input: $input) {
        word {
          id
          text
          exampleSentence
          audio
        }
      }
    }
`;

export const UPDATE_CH_WORD = gql`
    mutation updateCHWord($input: UpdateWordCHInput!) {
      updateChWord(input: $input) {
        word {
          id
          text
          exampleSentence
          audio
        }
      }
    }
`;