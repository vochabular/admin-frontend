import React from "react";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "../../styles";
import {useTranslation} from "react-i18next";
import {GET_WORDGROUPS} from "src/queries/wordgroups";
import BusyOrErrorCard from "src/components/BusyOrErrorCard";
import {chapters_chapters} from "src/queries/__generated__/chapters"; // TODO Change to generated type
import Grid from "@material-ui/core/Grid";
import WordGroupCard from "src/components/WordGroupCard";

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
  return data.wordGroups.map((w: chapters_chapters, i: number) => ( // TODO: change type to generated type
      <Grid key={i}>
        <WordGroupCard wordgroup={w} />
      </Grid>
  ));
};

export default withStyles(styles)(VoggiSection);
