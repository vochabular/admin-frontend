import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Comment from "./Comment";
import { Divider, TextField, Button, Grid } from "@material-ui/core";
import { subscribeAllComments_comments } from "queries/__generated__/subscribeAllComments";
import { useMutation } from "react-apollo-hooks";
import {
  CREATE_COMMENT,
  RESOLVE_COMMENT,
  DELETE_COMMENT
} from "queries/comments";
import { useAuth } from "contexts/AuthContext";
import { createComment as TcreateComment } from "queries/__generated__/createComment";
import { resolveComment as TresolveComment } from "queries/__generated__/resolveComment";
import { deleteComment as TdeleteComment } from "queries/__generated__/deleteComment";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.grey[600],
      marginBottom: 20,
      marginTop: 20,
      padding: theme.spacing(2)
    }
  });

interface Props extends WithStyles<typeof styles> {
  /**
   * TODO: A single discussion
   */
  data: subscribeAllComments_comments;
}

const Discussion = ({ classes, data }: Props) => {
  const { t } = useTranslation();
  const [reply, setReply] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAuth();

  const [createComment, { loading }] = useMutation<TcreateComment>(
    CREATE_COMMENT
  );

  const [resolveComment, { loading: resolveLoading }] = useMutation<
    TresolveComment
  >(RESOLVE_COMMENT);

  const [deleteComment, { loading: deleteLoading }] = useMutation<
    TdeleteComment
  >(DELETE_COMMENT);

  function handleOpenMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleReplyInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setReply(event.target.value);
  }

  function handleSubmitReply() {
    createComment({
      variables: {
        comment: {
          text: reply,
          active: true,
          fk_author_id: user!.userId,
          fk_parent_comment_id: data.id,
          fk_component_id: data.componentId
        }
      }
    });
    setReply("");
  }

  function handleResolveDiscussion() {
    resolveComment({ variables: { id: data && data.id } });
    handleCloseMenu();
  }

  function handleDeleteDiscussion() {
    deleteComment({ variables: { id: data && data.id } });
    handleCloseMenu();
  }
  return (
    <div className={classes.container}>
      <Comment data={data} />
      {data &&
        data.answers.map(c => (
          <React.Fragment key={c.id}>
            <Comment data={c} />
            <Divider />
          </React.Fragment>
        ))}
      <Divider />
      <TextField
        id="reply"
        label={t("reply")}
        fullWidth
        multiline
        //rowsMax="4"
        value={reply}
        onChange={handleReplyInputChange}
        //className={classes.textField}
        margin="normal"
      />
      {reply.length ? (
        <Button
          id="new-comment"
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleSubmitReply}
        >
          {t("submit")}
        </Button>
      ) : (
        <Grid container justify="space-between" direction="row-reverse">
          <IconButton
            aria-label="menu"
            aria-owns={anchorEl ? "discussion-action-menu" : undefined}
            aria-haspopup="true"
            onClick={handleOpenMenu}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="discussion-action-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem
              onClick={handleResolveDiscussion}
              disabled={data && !data.active}
            >
              {t("resolve")}
            </MenuItem>
            <MenuItem onClick={handleDeleteDiscussion}>{t("delete")}</MenuItem>
          </Menu>
          {data && data.active ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleResolveDiscussion}
              disabled={resolveLoading}
            >
              <CheckIcon />
              {t("resolve")}
            </Button>
          ) : null}
        </Grid>
      )}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Discussion);
