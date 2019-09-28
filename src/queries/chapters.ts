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
    texts {
      id
      translations {
        id
        textField: text_field
      }
    }
  }
`;

export const WORD_FRAGMENT = gql`
  fragment WordParts on api_word {
    id
    translations {
      id
      text
      audio
      exampleSentence: example_sentence
      language {
        code
        name
      }
    }
  }
`;

export const WORDGROUP_FRAGMENT = gql`
  fragment WordgroupParts on api_wordgroup {
    parentChapterId: fk_chapter_id
    id
    titleCh: title_ch
    titleDe: title_de
    words {
      id
      word {
        ...WordParts
      }
    }
  }
  ${WORD_FRAGMENT}
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

export const GET_CHAPTER_BY_ID = gql`
  subscription subscribeChapterById($id: uuid!) {
    chapter: api_chapter_by_pk(id: $id) {
      ...ChapterHeaderParts
      subChapters {
        ...ChapterHeaderParts
      }
      components {
        ...ComponentParts
      }
    }
  }
  ${CHAPTER_HEADER_PART}
  ${COMPONENT_PART}
`;

export const GET_CHAPTER_WORDGROUPS = gql`
  subscription chapters_wordGroups {
    chapters: api_chapter(where: { fk_belongs_to_id: { _is_null: false } }) {
      ...ChapterHeaderParts
      wordgroups {
        ...WordgroupParts
      }
    }
  }
  ${CHAPTER_HEADER_PART}
  ${WORDGROUP_FRAGMENT}
`;


export const GET_CHAPTER_WORDGROUPS_BY_CHAPTER_ID = gql`
  subscription subscribeChaptersWordGroupsByChapterId($id: uuid!) {
    chapters: api_chapter_by_pk(id: $id) {
      id
      titleDE
      titleCH
      wordgroups {
        ...WordgroupParts
      }
      parentChapter: fk_belongs_to_id
        id
      }
    }
    ${WORDGROUP_FRAGMENT}
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
