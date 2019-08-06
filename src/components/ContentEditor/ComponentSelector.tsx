import * as React from "react";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { useQuery } from "react-apollo-hooks";
import classNames from "classnames";

import {
  withStyles,
  WithStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
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
import { TAppState } from "reducers";
import { IContentEditorState } from "reducers/contentEditorSlice";
import {
  getComponentTypeById,
  getComponentTypeById_type_children
} from "queries/__generated__/getComponentTypeById";

/**
 * A user-defined type-guard: See here: https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
function isByIdResult(
  result: getAllComponentTypes | getComponentTypeById
): result is getComponentTypeById {
  return (result as getComponentTypeById).type !== undefined;
}

const styles = (theme: Theme) =>
  createStyles({
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
  });

interface Props extends WithStyles<typeof styles> {}

const ComponentSelector = ({ classes }: Props) => {
  const { selectedComponent } = useSelector<TAppState, IContentEditorState>(
    state => state.contentEditor
  );

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
              <Grid
                item
                key={component.id}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Card
                  square
                  className={classNames(
                    classes.item,
                    snapshot.isDragging ? classes.dragging : null
                  )}
                >
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {component.name}
                    </Typography>
                    <Icon>{component.icon}</Icon>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Draggable>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(ComponentSelector);
