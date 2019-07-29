import React from "react";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import { styles } from "styles";
import { GET_WORDGROUPS } from "queries/wordgroups";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import WordGroupCard from "components/WordGroupCard";
import SectionCardContainer from "../../components/SectionCardContainer";
import { subscribeWordGroups } from "queries/__generated__/subscribeWordGroups";

interface Props extends WithStyles<typeof styles> {}

const VoggiSection: React.FunctionComponent<Props> = ({ classes }) => {
  const { data, error, loading } = useQuery<subscribeWordGroups>(
    GET_WORDGROUPS
  );

  if (loading || error || (data && data.wordGroups.length))
    return (
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={
          !loading &&
          data &&
          data.wordGroups &&
          data.wordGroups &&
          !data.wordGroups.length
        }
      />
    );
  return (
    <SectionCardContainer>
      {data &&
        data.wordGroups &&
        data.wordGroups.map(w =>
          w ? (
            <Grid item key={w.id}>
              <WordGroupCard wordGroup={w} />
            </Grid>
          ) : null
        )}
    </SectionCardContainer>
  );
};

export default withStyles(styles)(VoggiSection);
