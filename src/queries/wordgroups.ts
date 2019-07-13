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
        words {
          id
          wordch {
            id
            audio
            text
            exampleSentence
          }
          wordde {
            id
            audio
            text
            exampleSentence
          }
          worden {
            id
            audio
            text
            exampleSentence
          }
          wordar {
            id
            audio
            text
            exampleSentence
          }
          wordfa {
            id
            audio
            text
            exampleSentence
          }
        }
      }
    }
  }
}
`;

export const GET_WORDGROUP_BY_ID = gql`
  query wordGroupById($id: ID) {
  wordGroup(id: $id) {
    id
    titleCh
    titleDe
    words {
      id
      wordch {
        id
        exampleSentence
        text
        audio
      }
      wordde {
        id
        exampleSentence
        text
        audio
      }
      worden {
        id
        exampleSentence
        text
        audio
      }
      wordar {
        id
        exampleSentence
        text
        audio
      }
      wordfa {
        id
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

export const UPDATE_EN_WORD = gql`
    mutation updateENWord($input: UpdateWordENInput!) {
      updateEnWord(input: $input) {
        word {
          id
          text
          exampleSentence
          audio
        }
      }
    }
`;

export const UPDATE_FA_WORD = gql`
    mutation updateFAWord($input: UpdateWordFAInput!) {
      updateFaWord(input: $input) {
        word {
          id
          text
          exampleSentence
          audio
        }
      }
    }
`;

export const UPDATE_AR_WORD = gql`
    mutation updateARWord($input: UpdateWordARInput!) {
      updateArWord(input: $input) {
        word {
          id
          text
          exampleSentence
          audio
        }
      }
    }
`;