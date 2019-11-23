import gql from "graphql-tag";

export const WORD_FRAGMENT = gql`
  fragment WordParts on api_word {
    id
    translations {
      id
      text
      audio
      exampleSentence: example_sentence
      language {
        id
        name
      }
    }
  }
`;

export const WORDGROUP_FRAGMENT = gql`
  fragment WordgroupParts on api_wordgroup {
    parentChapterId: fk_chapter_id
    id
    words {
      id
      word {
        ...WordParts
      }
    }
  }
  ${WORD_FRAGMENT}
`;

export const GET_WORDGROUPS = gql`
  subscription subscribeWordGroups {
    wordGroups: api_wordgroup {
      ...WordgroupParts
    }
  }
  ${WORDGROUP_FRAGMENT}
`;

export const GET_WORDGROUP_BY_ID = gql`
  subscription subscribeWordGroupById($id: uuid!) {
    wordGroup: api_wordgroup_by_pk(id: $id) {
      ...WordgroupParts
    }
  }
  ${WORDGROUP_FRAGMENT}
`;

export const UPSERT_WORDGROUP = gql`
  mutation upsertWordGroup($input: [api_wordgroup_insert_input!]!) {
    insert_api_wordgroup(objects: $input) {
      returning {
        ...WordgroupParts
      }
    }
  }
  ${WORDGROUP_FRAGMENT}
`;

/**
 * See here why we are "updating" (--> actually not, just using it since otherwise the nested upsert would fail..) the ID column:
 * https://docs.hasura.io/1.0/graphql/manual/mutations/upsert.html
 */
export const UPSERT_WORD = gql`
  mutation upsertWord(
    $wordId: uuid!
    $input: api_wordtranslation_insert_input!
  ) {
    insert_api_word(
      on_conflict: { constraint: api_word_pkey, update_columns: [id] }
      objects: [
        {
          id: $wordId
          translations: {
            data: [$input]
            on_conflict: {
              constraint: api_wordtranslation_pkey
              update_columns: [text, audio]
            }
          }
        }
      ]
    ) {
      returning {
        ...WordParts
      }
    }
  }
  ${WORD_FRAGMENT}
`;
