import * as React from "react";
import { useQuery } from "react-apollo-hooks";

import {
  withStyles,
  WithStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import { Grid, Card, Typography, CardContent, Icon } from "@material-ui/core";

import { GET_ALL_COMPONENTTYPES } from "src/queries/componentTypes";
import { Draggable } from "react-beautiful-dnd";

const mockData = {
  componentTypes: [
    {
      id: 1,
      name: "title",
      label: "componentTypes:title",
      icon: "title",
      schema: "abcd"
    },
    {
      id: 2,
      name: "text",
      label: "componentTypes:text",
      icon: "format_bold",
      schema: "text"
    }
  ]
};

interface Props extends WithStyles<typeof styles> {}

const ComponentSelector = ({ classes }: Props) => {
  const { data, loading, error } = useQuery(GET_ALL_COMPONENTTYPES);

  const componentTypes = mockData.componentTypes; // (data && data.componentTypes) || [];

  return (
    <Grid container justify="center" className={classes.container}>
      {componentTypes.map((c: any, index: number) => (
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
                    {c.label}
                  </Typography>
                  <Icon>{c.icon}</Icon>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Draggable>
      ))}
    </Grid>
  );
};

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

export default withStyles(styles, { withTheme: true })(ComponentSelector);
