import * as React from "react";
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
import { getAllComments_comments_edges_node } from "queries/__generated__/getAllComments";
import { useMutation } from "react-apollo-hooks";
import {
  CREATE_COMMENT,
  GET_ALL_COMMENTS,
  GET_ACTIVE_COMMENTS
} from "queries/comments";
import { createComment } from "queries/__generated__/createComment";
import auth0Client from "auth/Auth";
import { convertGlobalToDbId } from "helpers";
import { getOperationName } from "apollo-link";

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
  data: getAllComments_comments_edges_node;
}

const Discussion = ({ classes, data }: Props) => {
  const { t } = useTranslation();
  const [reply, setReply] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const createComment = useMutation<createComment>(CREATE_COMMENT);

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
          fkAuthorId: auth0Client.dbId,
          fkParentCommentId: convertGlobalToDbId(data.id),
          fkComponentId: 1 // TODO(df): Need to set this from a shared state, e.g. selected component?
        }
      },
      // TODO(df): This should actually not be necessary, since the return from the mutation should update the store???
      refetchQueries: [
        getOperationName(GET_ALL_COMMENTS) || "",
        getOperationName(GET_ACTIVE_COMMENTS) || ""
      ]
    });
  }

  function handleResolveDiscussion() {}

  return (
    <div className={classes.container}>
      <Comment data={data} />
      {data &&
        data.commentSet &&
        data.commentSet.edges.map(
          c =>
            c &&
            c.node && (
              <React.Fragment key={c.node.id}>
                <Comment data={c.node} />
                <Divider />
              </React.Fragment>
            )
        )}
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
          onClick={handleSubmitReply}
        >
          {t("submit")}
        </Button>
      ) : (
        <Grid container justify="space-between">
          <Button variant="contained" color="primary">
            <CheckIcon />
            {t("resolve")}
          </Button>
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
            <MenuItem onClick={handleCloseMenu}>{t("resolve")}</MenuItem>
            <MenuItem onClick={handleCloseMenu}>{t("delete")}</MenuItem>
          </Menu>
        </Grid>
      )}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Discussion);
