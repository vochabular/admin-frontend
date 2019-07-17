import gql from "graphql-tag";
import { USER_FRAGMENT } from "./users";

export const COMMENT_FRAGMENT = gql`
  fragment CommentParts on CommentType {
    id
    text
    context
    active
    written
    fkAuthor {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_ALL_COMMENTS = gql`
  query getAllComments {
    comments {
      edges {
        node {
          ...CommentParts
          commentSet {
            edges {
              node {
                ...CommentParts
              }
            }
          }
          fkComponent {
            id
          }
          fkParentComment {
            id
          }
        }
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const GET_ACTIVE_COMMENTS = gql`
  query getActiveComments {
    comments(active: true) {
      edges {
        node {
          ...CommentParts
          commentSet {
            edges {
              node {
                ...CommentParts
              }
            }
          }
          fkComponent {
            id
          }
          fkParentComment {
            id
          }
        }
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const CREATE_COMMENT = gql`
  mutation createComment($comment: CommentInput!) {
    createComment(input: { commentData: $comment }) {
      comment {
        ...CommentParts
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;
