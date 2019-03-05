import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";

import { styles } from "../../styles";
import { GET_CHAPTERS } from "../../queries/chapters";

// TODO: We should have the AppBar in a own component. However, that messes up the layout...
// import AppBar from "../components/AppBar";

interface Props extends WithStyles<typeof styles> {}

const ChapterSection: React.FunctionComponent<Props> = ({ classes }) => {
  const { data, error, loading } = useQuery(GET_CHAPTERS);

  if (loading || error || !data.length)
    return (
      <Card>
        <CardContent>
          {error ? (
            <Typography>{error.message}</Typography>
          ) : loading ? (
            <CircularProgress />
          ) : (
            <Typography>Es sind noch keine Kapitel vorhanden...</Typography>
          )}
        </CardContent>
      </Card>
    );
  return data.map((c: any) => (
    <Card>
      <CardContent>
        <Typography>{c.title}</Typography>
      </CardContent>
    </Card>
  ));
};

export default withStyles(styles)(ChapterSection);
