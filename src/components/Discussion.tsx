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

interface Props extends WithStyles<typeof styles> {
  /**
   * TODO: A single discussion
   */
  data: any;
}

const Discussion = ({ classes, data }: Props) => {
  const { t } = useTranslation();
  const [newComment, setNewComment] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleNewCommentInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNewComment(event.target.value);
  }

  return (
    <div className={classes.container}>
      <div>{data.id}</div>
      <Comment data={data} />
      {data.responses.map((c: any) => (
        <React.Fragment key={c.id}>
          <Comment data={c} />
          <Divider />
        </React.Fragment>
      ))}
      <Divider />
      <TextField
        id="new-comment"
        label="New comment"
        fullWidth
        multiline
        //rowsMax="4"
        value={newComment}
        onChange={handleNewCommentInputChange}
        //className={classes.textField}
        margin="normal"
      />
      {newComment.length ? (
        <Button
          disabled={false}
          id="new-comment"
          variant="contained"
          color="primary"
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
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="discussion-action-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>{t("resolve")}</MenuItem>
            <MenuItem onClick={handleClose}>{t("delete")}</MenuItem>
          </Menu>
        </Grid>
      )}
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.grey[600],
      marginBottom: 20,
      marginTop: 20,
      padding: theme.spacing(2)
    }
  });

export default withStyles(styles, { withTheme: true })(Discussion);
