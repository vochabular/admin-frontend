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
import {
  getAllComponentTypes,
  getAllComponentTypes_componentTypes
} from "queries/__generated__/getAllComponentTypes";

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
  const { data, loading, error } = useQuery<getAllComponentTypes>(
    GET_ALL_COMPONENTTYPES
  );
  const componentTypes = (data && data.componentTypes) || [];

  return (
    <Grid container justify="center" className={classes.container}>
      <BusyOrErrorCard error={error} loading={loading} />
      {componentTypes.map(
        (c: getAllComponentTypes_componentTypes | null, index: number) =>
          c && (
            <Draggable key={c.id} draggableId={c.id} index={index}>
              {(provided, snapshot) => (
                <Grid
                  item
                  key={c.id}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card square className={classes.item}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {c.name}
                      </Typography>
                      <Icon>star</Icon>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Draggable>
          )
      )}
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(ComponentSelector);
