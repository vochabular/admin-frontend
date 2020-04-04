import * as React from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";

import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

import { subscribeChapterById_chapter_components } from "queries/__generated__/subscribeChapterById";
import { DELETE_COMPONENT } from "queries/component";
import Text from "components/Text";
import { getSelectedComponent_component } from "queries/__generated__/getSelectedComponent";

interface Props {
  data:
    | subscribeChapterById_chapter_components
    | getSelectedComponent_component;
}

export default function ActionMenu({ data }: Props) {
  const client = useApolloClient();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
    <>
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
    </>
  );
}
