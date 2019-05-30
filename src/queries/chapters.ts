import gql from "graphql-tag";

export const CHAPTER_HEADER_PART = gql`
  fragment ChapterHeaderParts on ChapterType {
    id
    number
    title
    description
    parentChapter: fkBelongsTo {
      id
      number
      title
      description
    }
    chapterSet {
      id
      title
      description
    }
  }
`;

export const COMPONENT_PART = gql`
  fragment ComponentParts on Component_Type {
    id
    data
    state
    texts: textSet {
      id
      translations: translationSet {
        id
        language
        textField
      }
    }
  }
`;

export const GET_CHAPTERS = gql`
  query chapters {
    chapters {
      ...ChapterHeaderParts
      components: componentSet {
        ...ComponentParts
      }
    }
  }
  ${CHAPTER_HEADER_PART}
  ${COMPONENT_PART}
`;

export const GET_CHAPTER_BY_ID = gql`
  query chapterById($id: Int) {
    chapter(id: $id) {
      ...ChapterHeaderParts
      subChapters: chapterSet {
        ...ChapterHeaderParts
      }
      components: componentSet {
        ...ComponentParts
      }
    }
  }
  ${CHAPTER_HEADER_PART}
  ${COMPONENT_PART}
`;

export const UPSERT_CHAPTER = gql`
  mutation createChapter($input: IntroduceChapterInput!) {
    createChapter(input: $input) {
      chapter {
        title
      }
    }
  }
`;
