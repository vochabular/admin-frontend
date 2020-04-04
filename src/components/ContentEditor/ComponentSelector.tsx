import * as React from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable
} from "react-beautiful-dnd";
import { useQuery } from "@apollo/react-hooks";
import classNames from "classnames";
import styled from "styled-components";
import { ApolloError } from "apollo-client";

import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Icon,
  AppBar,
  Toolbar
} from "@material-ui/core";

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
  getComponentTypeById_type_children,
  getComponentTypeByIdVariables
} from "queries/__generated__/getComponentTypeById";
import { getSelectedComponent_component } from "queries/__generated__/getSelectedComponent";
import {
  TOP_LEVEL_COMPONENT_TYPE,
  IHandleComponentCreation
} from "./ContentEditor";

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
  },
  copying: {
    backgroundColor: theme.palette.grey[400]
  },
  hideElement: {
    display: "none"
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
  isCopying?: boolean;
  onCreate?: (data: IHandleComponentCreation) => void;
};

const ComponentTypeItem = ({
  item,
  provided,
  snapshot,
  isCopying = false,
  onCreate
}: ComponentTypeItemProps) => {
  const classes = useStyles();

  function handleClick() {
    if (!onCreate)
      console.info("Warning: No component creation callback specified!");
    else {
      onCreate({ typeId: item.id });
    }
  }

  const content = (
    <Card
      square
      className={classNames(
        classes.item,
        snapshot && snapshot.isDragging ? classes.dragging : null,
        isCopying && classes.copying
      )}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {item.label}
        </Typography>
        <Icon>{item.icon}</Icon>
      </CardContent>
    </Card>
  );

  if (provided) {
    return (
      <Grid
        onClick={handleClick}
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

interface IComponentSelectorWithDataProps extends ComponentSelectorProps {
  types?: getAllComponentTypes_types[] | getComponentTypeById_type_children[];
}

/**
 * Main container component, receiving the result from the higher up queries
 */
const ComponentSelectorWithData = ({
  loading,
  error,
  types = [],
  selectedComponent,
  ...otherProps
}: IComponentSelectorWithDataProps) => {
  const classes = useStyles();

  return (
    <Droppable
      droppableId={`component-selector-${TOP_LEVEL_COMPONENT_TYPE}`}
      type={
        !selectedComponent
          ? TOP_LEVEL_COMPONENT_TYPE
          : `${selectedComponent.type.name}-${selectedComponent.id}`
      }
      isDropDisabled={true}
      direction="horizontal"
    >
      {provided => (
        <>
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <AppBar position="static" color="inherit">
              <Toolbar>
                <Grid container justify="center" className={classes.container}>
                  <BusyOrErrorCard
                    error={error}
                    loading={loading}
                    noResults={!types.length}
                    showOnNoResults={false}
                  />
                  {!loading &&
                    types.map((component, index) => {
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
                                {...otherProps}
                              />
                              {/* react-beautiful-dnd unfortunately does not support Copy & Clone. 
                          See here for the workaround with this "Clone": 
                          https://github.com/atlassian/react-beautiful-dnd/issues/216#issuecomment-423708497  
                          */}
                              {snapshot.isDragging && (
                                <ComponentTypeItem
                                  item={component}
                                  isCopying={true}
                                />
                              )}
                            </>
                          )}
                        </Draggable>
                      );
                    })}
                </Grid>
              </Toolbar>
            </AppBar>
          </div>
          <div className={classes.hideElement}>{provided.placeholder}</div>
        </>
      )}
    </Droppable>
  );
};

/**
 * Gets all top-level component types
 */
const AllTopComponentSelector = (props: ComponentSelectorProps) => {
  const { data, loading, error } = useQuery<getAllComponentTypes>(
    GET_ALL_COMPONENTTYPES
  );
  return (
    <ComponentSelectorWithData
      loading={loading}
      error={error}
      types={(data && data.types) || []}
      {...props}
    />
  );
};

/**
 * Gets the children types of the the current selected component type
 */
const SelectedComponentSelector = (props: ComponentSelectorProps) => {
  const typeId = props.selectedComponent && props.selectedComponent.type.id;

  const { data, loading, error } = useQuery<
    getComponentTypeById,
    getComponentTypeByIdVariables
  >(GET_COMPONENTTYPE_BY_ID, { variables: { id: typeId }, skip: !typeId });
  return (
    <ComponentSelectorWithData
      loading={props.loading || loading}
      error={props.error || error}
      types={(data && data.type && data.type.children) || []}
      {...props}
    />
  );
};

interface ComponentSelectorProps {
  selectedComponent?: getSelectedComponent_component;
  loading: boolean;
  error?: ApolloError;
  onCreate?: (data: IHandleComponentCreation) => void;
}

/**
 * Main Component acting as a gate to query the right component type data depending whether there is a currently selected component
 */
const ComponentSelector = (props: ComponentSelectorProps) => {
  const selectedComponentId =
    props.selectedComponent && props.selectedComponent.id;
  if (selectedComponentId) return <SelectedComponentSelector {...props} />;
  return <AllTopComponentSelector {...props} />;
};

export default ComponentSelector;
