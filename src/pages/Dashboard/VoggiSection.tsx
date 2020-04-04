import React from "react";
import { useSubscription } from "@apollo/react-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { styles } from "styles";
import { GET_WORDGROUPS } from "queries/wordgroups";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import WordGroupCard from "components/WordGroupCard";
import SectionCardContainer from "../../components/SectionCardContainer";
import { subscribeWordGroups } from "queries/__generated__/subscribeWordGroups";

interface Props extends WithStyles<typeof styles> {}

const VoggiSection: React.FunctionComponent<Props> = ({ classes }) => {
  const { data, error, loading } = useSubscription<subscribeWordGroups>(
    GET_WORDGROUPS
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
