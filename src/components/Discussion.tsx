import * as React from "react";
import { useTranslation } from "react-i18next";

import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";
import Comment from "./Comment";
import { Divider, TextField } from "@material-ui/core";

interface Props extends WithStyles<typeof styles> {
  /**
   * TODO: A single discussion
   */
  data: any;
}

const Discussion = ({ classes, data }: Props) => {
  const { t } = useTranslation();
  const [newComment, setNewComment] = React.useState("");

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
    </div>
  );
};

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.grey[600],
      marginBottom: 20,
      marginTop: 20,
      padding: theme.spacing(2)
    }
  });

export default withStyles(styles, { withTheme: true })(Discussion);
