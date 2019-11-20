import * as React from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";
import { useQuery } from "@apollo/react-hooks";
import classNames from "classnames";
import styled from "styled-components";
import { ApolloError } from "apollo-client";

import { Theme, makeStyles } from "@material-ui/core/styles";
import { Grid, Card, Typography, CardContent, Icon } from "@material-ui/core";

import {
  GET_ALL_COMPONENTTYPES,
  GET_COMPONENTTYPE_BY_ID
} from "queries/componentTypes";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import {
  getAllComponentTypes,
  getAllComponentTypes_types
} from "queries/__generated__/getAllComponentTypes";
import {
  getComponentTypeById,
  getComponentTypeById_type_children
} from "queries/__generated__/getComponentTypeById";
import { GET_LOCAL_SELECTED_COMPONENT_ID } from "queries/component";
import { getSelectedComponentId } from "queries/__generated__/getSelectedComponentId";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100px",
    backgroundColor: theme.palette.grey[800]
    //padding: theme.spacing(2)
  },
  item: {
    backgroundColor: theme.palette.grey[600]
  },
  dragging: {
    backgroundColor: theme.palette.grey[400]
  }
}));

const Clone = styled.div`
  ~ div {
    transform: none !important;
  }
`;

type ComponentTypeItemProps = {
  item: getComponentTypeById_type_children;
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
};

const ComponentTypeItem = ({
  item,
  provided,
  snapshot
}: ComponentTypeItemProps) => {
  const classes = useStyles();

  const content = (
    <Card
      square
      className={classNames(
        classes.item,
        snapshot && snapshot.isDragging ? classes.dragging : null
      )}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {item.name}
        </Typography>
        <Icon>{item.icon}</Icon>
      </CardContent>
    </Card>
  );

  if (provided) {
    return (
      <Grid
        item
        key={item.id}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {content}
      </Grid>
    );
  }
  return (
    <Clone>
      <Grid item key={`${item.id}-2`}>
        {content}
      </Grid>
    </Clone>
  );
};

interface IComponentSelectorWithDataProps {
  loading: boolean;
  error?: ApolloError;
  types?: getAllComponentTypes_types[] | getComponentTypeById_type_children[];
}

/**
 * Main container component, receiving the result from the higher up queries
 */
const ComponentSelectorWithData = ({
  loading,
  error,
  types = []
}: IComponentSelectorWithDataProps) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.container}>
      <BusyOrErrorCard
        error={error}
        loading={loading}
        noResults={!types.length}
        showOnNoResults={false}
      />
      {types.map((component, index) => {
        return (
          <Draggable
            key={component.id}
            draggableId={component.id}
            index={index}
          >
            {(provided, snapshot) => (
              <>
                <ComponentTypeItem
                  item={component}
                  provided={provided}
                  snapshot={snapshot}
                />
                {/* react-beautiful-dnd unfortunately does not support Copy & Clone. 
                See here for the workaround with this "Clone": 
                https://github.com/atlassian/react-beautiful-dnd/issues/216#issuecomment-423708497  
                */}
                {snapshot.isDragging && <ComponentTypeItem item={component} />}
              </>
            )}
          </Draggable>
        );
      })}
    </Grid>
  );
};

/**
 * Gets all top-level component types
 */
const AllTopComponentSelector = () => {
  const { data, loading, error } = useQuery<getAllComponentTypes>(
    GET_ALL_COMPONENTTYPES
  );
  return (
    <ComponentSelectorWithData
      loading={loading}
      error={error}
      types={(data && data.types) || []}
    />
  );
};

interface ISelectedComponentSelectorProps {
  selectedComponentId: string;
}

/**
 * Gets the children types of the the current selected component type
 */
const SelectedComponentSelector = ({
  selectedComponentId
}: ISelectedComponentSelectorProps) => {
  const { data, loading, error } = useQuery<getComponentTypeById>(
    GET_COMPONENTTYPE_BY_ID,
    { variables: { id: selectedComponentId } }
  );
  return (
    <ComponentSelectorWithData
      loading={loading}
      error={error}
      types={(data && data.type && data.type.children) || []}
    />
  );
};

/**
 * Main Component acting as a gate to query the right component type data depending whether there is a currently selected component
 */
const ComponentSelector = () => {
  const { data: selectedComponentIdData } = useQuery<getSelectedComponentId>(
    GET_LOCAL_SELECTED_COMPONENT_ID
  );
  const { selectedComponentId = undefined } = selectedComponentIdData || {};

  if (selectedComponentId)
    return (
      <SelectedComponentSelector selectedComponentId={selectedComponentId} />
    );
  return <AllTopComponentSelector />;
};

export default ComponentSelector;
