import gql from "graphql-tag";

export const WORDGROUP_FRAGMENT = gql`
fragment WordgroupParts on api_wordgroup {
  fk_chapter_id
  id
  title_ch
  title_de
  words {
    id
    word {
      id
      wordTranslations {
        audio
        example_sentence
        language {
          code
          name
        }
        text
        id
      }
    }
  }
`;

export const GET_WORDGROUPS = gql`
subscription getWordgroup {
  api_wordgroup {
    ...WordgroupParts
  }
}
${WORDGROUP_FRAGMENT}
`;

export const GET_WORDGROUP_BY_ID = gql`
subscription wordgroupById($id: uuid) {
  api_wordgroup(where: {id: {_eq: $id}}) {
    ...WordgroupParts
  }
}
${WORDGROUP_FRAGMENT}
`;

export const INSERT_WORDGROUP = gql`
mutation insertWordGroup($input: [api_wordgroup_insert_input!]!) {
  insert_api_wordgroup(objects: $input) {
    returning {
      id
      fk_chapter_id
      title_ch
      title_de
    }
  }
}
`;

export const UPDATE_WORDGROUP = gql`
mutation updateWordGroup($id: uuid, $input: api_wordgroup_set_input!) {
  update_api_wordgroup(where: {id: {_eq: $id}}, _set: $input) {
    returning {
      id
      title_ch
      title_de
    }
  }
}
`;

export const INSERT_WORD = gql`

`;
