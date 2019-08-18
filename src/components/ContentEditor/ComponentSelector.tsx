import * as React from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";
import { useQuery } from "@apollo/react-hooks";
import classNames from "classnames";
import styled from "styled-components";

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
import {
  GET_LOCAL_SELECTED_COMPONENT_ID,
  GET_SELECTED_COMPONENT
} from "queries/component";
import { getSelectedComponent } from "queries/__generated__/getSelectedComponent";
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

/**
 * A user-defined type-guard: See here: https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
function isByIdResult(
  result: getAllComponentTypes | getComponentTypeById
): result is getComponentTypeById {
  return (result as getComponentTypeById).type !== undefined;
}

const ComponentSelector = () => {
  const classes = useStyles();

  const { data: selectedComponentIdData } = useQuery<getSelectedComponentId>(
    GET_LOCAL_SELECTED_COMPONENT_ID
  );
  const { selectedComponentId = undefined } = selectedComponentIdData || {};
  const { data: selectedComponentData } = useQuery<getSelectedComponent>(
    GET_SELECTED_COMPONENT,
    {
      skip: !selectedComponentId
    }
  );
  const { component: selectedComponent = undefined } =
    selectedComponentData || {};

  // Get either the top level components or
  const { data, loading, error } = useQuery<
    getAllComponentTypes | getComponentTypeById
  >(
    !selectedComponent ? GET_ALL_COMPONENTTYPES : GET_COMPONENTTYPE_BY_ID,
    !selectedComponent
      ? undefined
      : { variables: { id: selectedComponent.type.id } }
  );

  let types:
    | getAllComponentTypes_types
    | getComponentTypeById_type_children[] = [];
  if (data && !isByIdResult(data)) {
    types = data.types || [];
  } else if (data) {
    types = (data.type && data.type.children) || [];
  }

  return (
    <Grid container justify="center" className={classes.container}>
      <BusyOrErrorCard
        error={error}
        loading={loading}
        noResults={!types.length}
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

export default ComponentSelector;
