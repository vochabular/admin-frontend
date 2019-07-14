import gql from "graphql-tag";

export const CHAPTER_HEADER_PART = gql`
  fragment ChapterHeaderParts on ChapterType {
    id
    dbId: id
    number
    titleCH
    titleDE
    description
    parentChapter: fkBelongsTo {
      id
      number
      titleCH
      titleDE
      description
    }
    chapterSet {
      edges {
        node {
          id
          titleCH
          titleDE
          description
        }
      }
    }
  }
`;

export const COMPONENT_PART = gql`
  fragment ComponentParts on Component_Type {
    id
    data
    state
    texts: textSet {
      edges {
        node {
          id
          translations: translationSet {
            edges {
              node {
                id
                language
                textField
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CHAPTERS = gql`
  query chapters {
    chapters(fkBelongsTo_Isnull: true) {
      edges {
        node {
          ...ChapterHeaderParts
          componentSet {
            edges {
              node {
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

export const GET_CHAPTER_BY_ID = gql`
  query chapterById($id: Int) {
    chapter(id: $id) {
      ...ChapterHeaderParts
      subChapters: chapterSet {
        edges {
          node {
            ...ChapterHeaderParts
          }
        }
      }
      components: componentSet {
        edges {
          node {
            ...ComponentParts
          }
        }
      }
    }
  }
  ${CHAPTER_HEADER_PART}
  ${COMPONENT_PART}
`;

export const GET_CHAPTER_WORDGROUPS = gql`
query chapters_wordGroups{
  chapters {
    edges {
      node {
        id
        titleDE
        titleCH
        parentChapter: fkBelongsTo{
          id
        }
        wordGroups: wordgroupSet{
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
  mutation createChapter($input: IntroduceChapterInput!) {
    createChapter(input: $input) {
      chapter {
        number
        titleCH
        titleDE
        description
        languages
        fkBelongsTo {
          id
        }
      }
    }
  }
`;
