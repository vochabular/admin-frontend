import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { useQuery } from "react-apollo-hooks";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import { styles } from "src/styles";
import { GET_CHAPTERS } from "src/queries/chapters";
import ChapterCard from "src/components/ChapterCard";
import BusyOrErrorCard from "src/components/BusyOrErrorCard";
import { chapters_chapters } from "src/queries/__generated__/chapters";

interface Props extends WithStyles<typeof styles> {}

const ChapterSection: React.FunctionComponent<Props> = ({ classes }) => {
  const { t } = useTranslation();
  const { data, error, loading } = useQuery(GET_CHAPTERS);

  if (loading || error || !data.chapters.length)
    return (
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={!loading && data.chapters && !data.chapters.length}
      />
    );
  return ( data.chapters.map((c: chapters_chapters, i: number) => (
    <Grid item xs={12}  key={i}>
      <ChapterCard chapter={c} />
    </Grid>
  )));
};

export default withStyles(styles)(ChapterSection);
