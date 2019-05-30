import gql from "graphql-tag";
import { USER_FRAGMENT } from "./users";

export const COMMENT_FRAGMENT = gql`
  fragment CommentParts on CommentType {
    id
    comment
    active
    written
    authorName {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_ALL_COMMENTS = gql`
  query getAllComments {
    comments {
      ...CommentParts
    }
  }
  ${COMMENT_FRAGMENT}
`;
