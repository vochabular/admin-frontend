import * as React from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { Icon, Grid, IconButton, Menu, MenuItem } from "@material-ui/core";
import { DragHandle, MoreVert } from "@material-ui/icons";

import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import { DELETE_COMPONENT } from "queries/component";
import Text from "components/Text";

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  preview: {
    flex: 1
  }
}));

interface Props {
  provided: any;
  data: subscribeChapterById_chapter_components;
  preview?: React.ReactNode;
}

const ComponentHeader = ({ provided, data, preview }: Props) => {
  const classes = useStyles();
  const client = useApolloClient();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isOver, setIsOver] = React.useState(false);

  const [deleteComponent, { loading: deleteLoading }] = useMutation(
    DELETE_COMPONENT
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  function handleClose(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  }

  function handleDelete(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    event.preventDefault();
    deleteComponent({ variables: { id: data.id } });
    client.writeData({ data: { selectedComponentId: null } });
  }

  return (
    <Grid
      item
      container
      justify="space-between"
      alignItems="stretch"
      className={classes.container}
    >
      <Grid
        item
        onMouseEnter={() => setIsOver(true)}
        onMouseLeave={() => setIsOver(false)}
      >
        <IconButton {...provided.dragHandleProps}>
          {isOver ? <DragHandle /> : <Icon>{data.type.icon}</Icon>}
        </IconButton>
      </Grid>
      <Grid
        item
        container
        className={classes.preview}
        justify="center"
        alignItems="center"
      >
        {preview}
      </Grid>
      <Grid item>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          tabIndex={-1}
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
          <MenuItem onClick={handleDelete} disabled={deleteLoading}>
            <Text>delete</Text>
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default ComponentHeader;
