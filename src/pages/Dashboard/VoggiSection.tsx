import React from "react";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/styles";

import { styles } from "styles";
import {useTranslation} from "react-i18next";
import {GET_WORDGROUPS} from "queries/wordgroups";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import {wordGroups_wordGroups} from "queries/__generated__/wordGroups";
import Grid from "@material-ui/core/Grid";
import WordGroupCard from "components/WordGroupCard";

interface Props extends WithStyles<typeof styles> {}

const VoggiSection: React.FunctionComponent<Props> = ({ classes }) => {
  const { t } = useTranslation();
  const { data, error, loading } = useQuery(GET_WORDGROUPS);

  if (loading || error || !data.wordGroups.length)
    return (
        <BusyOrErrorCard
            loading={loading}
            error={error}
            noResults={!loading && data.wordGroups && !data.wordGroups.length}
        />
    );
  return data.wordGroups.map((w: wordGroups_wordGroups, i: number) => ( // TODO: change type to generated type
      <Grid container spacing={24} key={i}>
        <WordGroupCard wordgroup={w} />
      </Grid>
  ));
};

export default withStyles(styles)(VoggiSection);
