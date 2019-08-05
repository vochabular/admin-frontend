import gql from "graphql-tag";

export const CHAPTER_HEADER_PART = gql`
  fragment ChapterHeaderParts on api_chapter {
    id
    number
    titleCH
    titleDE
    description
    created
    updated
    parentChapter {
      id
      number
      titleCH
      titleDE
      description
    }
    subChapters {
      id
      titleCH
      titleDE
      description
    }
  }
`;

export const COMPONENT_PART = gql`
  fragment ComponentParts on api_component {
    id
    data
    state
    type {
      id
      name
      icon
    }
    texts {
      id
      translations {
        id
        textField: text_field
      }
    }
  }
`;

export const GET_CHAPTERS = gql`
  query getChapters {
    chapters: api_chapter(where: { fk_belongs_to_id: { _is_null: true } }) {
      ...ChapterHeaderParts
      components {
        ...ComponentParts
      }
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
      components {
        ...ComponentParts
        children {
          ...ComponentParts
          children {
            ...ComponentParts
            children {
              ...ComponentParts
              children {
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
          titleDE
          titleCH
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

export const GET_CHAPTER_WORDGROUPS_BY_CHAPTER_ID = gql`
  query chaptersWordGroupsByChapterId($id: Int) {
    chapter(id: $id) {
      id
      titleDE
      titleCH
      parentChapter: fkBelongsTo {
        id
      }
      wordGroups: wordgroupSet {
        edges {
          node {
            id
            titleCh
            titleDe
            words {
              id
            }
          }
        }
      }
    }
  }
`;

export const UPSERT_CHAPTER = gql`
  mutation createChapter($input: api_chapter_insert_input!) {
    insert_api_chapter(objects: [$input]) {
      returning {
        id
      }
    }
  }
`;
