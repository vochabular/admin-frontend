import * as React from "react";

import {
  withStyles,
  WithStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import { Grid, Card, Typography, CardContent, Icon } from "@material-ui/core";

import { Draggable } from "react-beautiful-dnd";
import { useQuery } from "react-apollo-hooks";
import { GET_ALL_COMPONENTTYPES } from "queries/componentTypes";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import { getAllComponentTypes } from "queries/__generated__/getAllComponentTypes";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.grey[800],
      padding: theme.spacing(2)
    },
    item: {
      backgroundColor: theme.palette.grey[600]
    }
  });

interface Props extends WithStyles<typeof styles> {}

const ComponentSelector = ({ classes }: Props) => {
  // TODO(df): Need to query the component types, either by top level or by
  const { data, loading, error } = useQuery<getAllComponentTypes>(
    GET_ALL_COMPONENTTYPES
  );

  const types = (data && data.types) || [];

  return (
    <Grid container justify="center" className={classes.container}>
      <BusyOrErrorCard error={error} loading={loading} />
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
                <Card square className={classes.item}>
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
