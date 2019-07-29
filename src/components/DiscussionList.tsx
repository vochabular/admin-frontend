import * as React from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "react-apollo-hooks";

import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";
import {
  CircularProgress,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import Box from "@material-ui/core/Box";

import { CREATE_COMMENT } from "queries/comments";
import { getAllComments } from "queries/__generated__/getAllComments";
import ErrorMessage from "./ErrorMessage";
import Discussion from "./Discussion";
import { createComment as createCommentType } from "queries/__generated__/createComment";
import auth0Client from "auth/Auth";
import { getOperationName } from "apollo-link";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      //height: "100%",
      backgroundColor: theme.palette.grey[500]
      //height: "300px"
    },
    wrapper: {
      display: "flex",
      flexFlow: "column",
      height: "100%"
    }
  });

interface Props extends WithStyles<typeof styles> {
  query: string;
  variables: string;
}

const DiscussionList = ({ classes, query }: Props) => {
  const { t } = useTranslation();
  const [newComment, setNewComment] = React.useState("");

  const createComment = useMutation<createCommentType>(CREATE_COMMENT);

  // TODO(df): Pass variables (chapter, context) down.
  const { data, loading, error } = useQuery<getAllComments>(query);
  const discussions = data && data.comments;

  function handleNewCommentInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNewComment(event.target.value);
  }

  function handleSubmitNewComment() {
    createComment({
      variables: {
        comment: {
          text: newComment,
          active: true,
          fkAuthorId: auth0Client.dbId,
          // fkParentCommentId: null,
          fkComponentId: 1
        }
      },
      refetchQueries: [getOperationName(query) || ""]
    });
  }

  return (
    <Box height="100%" className={classes.container}>
      {loading && <CircularProgress />}
      <ErrorMessage error={error && error.message} />
      {discussions ? (
        discussions.edges.map(
          d => d && d.node && <Discussion key={d.node.id} data={d.node} />
        )
      ) : (
        <Typography>{t("noCommentsYet")}</Typography>
      )}
      <TextField
        id="new-comment"
        label={t("newComment")}
        fullWidth
        multiline
        //rowsMax="4"
        value={newComment}
        onChange={handleNewCommentInputChange}
        //className={classes.textField}
        margin="normal"
      />
      {!!newComment.length && (
        <Button
          disabled={false}
          id="submit-new-comment"
          variant="contained"
          color="primary"
          onClick={handleSubmitNewComment}
        >
          {t("submit")}
        </Button>
      )}
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(DiscussionList);
