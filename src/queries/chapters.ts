import gql from "graphql-tag";
import { COMPONENT_PART } from "./component";

export const CHAPTER_HEADER_PART = gql`
  fragment ChapterHeaderParts on api_chapter {
    id
    number
    description
    created
    updated
    disable_children
    languages {
      id
      title
      language {
        id
        name
      }
    }
    parentChapter {
      id
      number
      description
    }
    subChapters {
      id
      description
      components {
        ...ComponentParts
      }
    }
  }
`;

export const GET_CHAPTERS = gql`
  query getChapters {
    chapters: api_chapter(where: { fk_belongs_to_id: { _is_null: true } }) {
      ...ChapterHeaderParts
    }
  }
  ${CHAPTER_HEADER_PART}
  ${COMPONENT_PART}
`;

/**
 * Since recursion is explicitly not allowed in the GraphQL-Spec (is an attack vector, see: https://github.com/graphql/graphql-spec/issues/91#issuecomment-254895093) we have to explicitly model the levels
 */
export const GET_CHAPTER_BY_ID = gql`
  subscription subscribeChapterById($id: uuid!) {
    chapter: api_chapter_by_pk(id: $id) {
      ...ChapterHeaderParts
      subChapters {
        ...ChapterHeaderParts
      }
      components(
        where: { fk_component_id: { _is_null: true } }
        order_by: { order_in_chapter: asc }
      ) {
        ...ComponentParts
        children(order_by: { order_in_chapter: asc }) {
          ...ComponentParts
          children(order_by: { order_in_chapter: asc }) {
            ...ComponentParts
            children(order_by: { order_in_chapter: asc }) {
              ...ComponentParts
              children(order_by: { order_in_chapter: asc }) {
                ...ComponentParts
              }
            }
          }
        }
      }
    }
  }
  ${CHAPTER_HEADER_PART}
  ${COMPONENT_PART}
`;

export const GET_CHAPTER_WORDGROUPS = gql`
  query chapters_wordGroups {
    chapters {
      edges {
        node {
          id
          parentChapter: fkBelongsTo {
            id
          }
          wordGroups: wordgroupSet {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const UPSERT_CHAPTER = gql`
  mutation upsertChapter($input: api_chapter_insert_input!, $deleteTitleIds: [uuid!]!) {
    insert_api_chapter(
      objects: [$input]
      on_conflict: { constraint: api_chapter_pkey, update_columns: [number, description] }
    ) {
      returning {
        id
      }
    }
    delete_api_chaptertitle(where: { id: { _in: $deleteTitleIds } }) {
      affected_rows
    }
  }
`;
