import * as React from "react";
import classNames from "classnames";
import { useMutation } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import {
  Icon,
  Typography,
  Grid,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import { DragHandle, MoreVert } from "@material-ui/icons";

import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import { DELETE_COMPONENT } from "queries/component";
import { actions, IContentEditorState } from "reducers/contentEditorSlice";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    border: "solid",
    borderWidth: 2,
    borderColor: theme.palette.grey[200],
    marginBottom: theme.spacing(2)
  }
}));

interface Props {
  provided: any;
  data: subscribeChapterById_chapter_components;
}

const ComponentHeader = ({ provided, data }: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const unselectComponent = React.useCallback(
    () => dispatch(actions.setSelectedComponent()),
    [dispatch]
  );

  const [
    deleteComponent,
    { loading: deleteLoading, error: deleteError }
  ] = useMutation(DELETE_COMPONENT);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  function handleClose(event: any) {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  }

  function handleDelete(event: any) {
    event.stopPropagation();
    event.preventDefault();
    deleteComponent({ variables: { id: data.id } });
    unselectComponent();
  }

  return (
    <Grid item container spacing={1} xs={12} justify="space-between">
      <IconButton {...provided.dragHandleProps}>
        <DragHandle />
      </IconButton>
      <Icon>{data.type.icon}</Icon>
      <Typography>{data.data}</Typography>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};

export default ComponentHeader;
