import gql from "graphql-tag";
import { USER_FRAGMENT } from "./users";

export const COMMENT_FRAGMENT = gql`
  fragment CommentParts on api_comment {
    id
    text
    context
    active
    created
    updated
    author {
      id
      firstname
      lastname
    }
    componentId: fk_component_id
  }
  ${USER_FRAGMENT}
`;

export const GET_ALL_COMMENTS = gql`
  subscription subscribeAllComments {
    comments: api_comment(where: { fk_parent_comment_id: { _is_null: true } }) {
      ...CommentParts
      answers(order_by: { created: asc_nulls_first }) {
        ...CommentParts
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const GET_ACTIVE_COMMENTS = gql`
  subscription subscribeActiveComments {
    comments: api_comment(
      where: { fk_parent_comment_id: { _is_null: true }, active: { _eq: true } }
    ) {
      ...CommentParts
      answers(order_by: { created: asc_nulls_first }) {
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
