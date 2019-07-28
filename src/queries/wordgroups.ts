import gql from "graphql-tag";

export const GET_WORDGROUPS = gql`
  query getWordGroups {
    wordGroups: api_wordgroup {
      id
      titleCh: title_ch
      titleDe: title_de
      words {
        word {
          id
          translations {
            id
            audio
            text
            exampleSentence: example_sentence
            language {
              id
              code
            }
          }
        }
      }
    }
  }
`;

export const GET_WORDGROUP_BY_ID = gql`
  query getWordGroupById($id: uuid!) {
    wordGroup: api_wordgroup_by_pk(id: $id) {
      id
      titleCh: title_ch
      titleDe: title_de
      words {
        word {
          id
          translations {
            id
            audio
            text
            exampleSentence: example_sentence
            language {
              id
              code
            }
          }
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
