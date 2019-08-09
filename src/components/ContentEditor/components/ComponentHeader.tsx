import * as React from "react";
import classNames from "classnames";
import { useMutation } from "@apollo/react-hooks";

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

import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import { DragHandle, MoreVert } from "@material-ui/icons";
import { DELETE_COMPONENT } from "queries/component";

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

  const [
    deleteComponent,
    { loading: deleteLoading, error: deleteError }
  ] = useMutation(DELETE_COMPONENT);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleDelete() {
    deleteComponent({ variables: { id: data.id } });
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
