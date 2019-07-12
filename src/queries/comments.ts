import gql from "graphql-tag";
import { USER_FRAGMENT } from "./users";

export const COMMENT_FRAGMENT = gql`
  fragment CommentParts on CommentType {
    id
    text
    context
    active
    written
    fkComponent{
        id
      }
      fkParentComment{
        id
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
        }
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;
