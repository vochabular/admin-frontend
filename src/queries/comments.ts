import gql from "graphql-tag";
import { USER_FRAGMENT } from "./users";

export const COMMENT_FRAGMENT = gql`
  fragment CommentParts on api_comment {
    id
    text
    context
    active
    written
    author {
      id
      firstname
      lastname
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_ALL_COMMENTS = gql`
  subscription subscribeAllComments {
    comments: api_comment {
      ...CommentParts
      answers {
        ...CommentParts
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const GET_ACTIVE_COMMENTS = gql`
  subscription subscribeActiveComments {
    comments: api_comment(where: { active: { _eq: true } }) {
      ...CommentParts
      answers {
        ...CommentParts
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const CREATE_COMMENT = gql`
  mutation createComment($comment: api_comment_insert_input!) {
    insert_api_comment(objects: [$comment]) {
      returning {
        ...CommentParts
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;
