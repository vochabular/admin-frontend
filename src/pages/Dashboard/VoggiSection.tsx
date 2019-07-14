import React from "react";
import {useQuery} from "react-apollo-hooks";

import {withStyles, WithStyles} from "@material-ui/styles";

import {styles} from "styles";
import {GET_WORDGROUPS} from "queries/wordgroups";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import {wordGroups_wordGroups, wordGroups_wordGroups_edges} from "queries/__generated__/wordGroups";
import Grid from "@material-ui/core/Grid";
import WordGroupCard from "components/WordGroupCard";
import SectionCardContainer from "../../components/SectionCardContainer";
import ChapterCard from "../../components/ChapterCard";
import {wordGroup_wordGroup} from "../../queries/__generated__/wordGroup";

interface Props extends WithStyles<typeof styles> {
}

const VoggiSection: React.FunctionComponent<Props> = ({classes}) => {
  const {data, error, loading} = useQuery(GET_WORDGROUPS);

  if (loading || error || !data.wordGroups.edges.length)
    return (
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={!loading && data.wordGroups.edges && !data.wordGroups.edges.length}
      />
    );
  return (
    <SectionCardContainer>
      {data &&
      data.wordGroups &&
      data.wordGroups.edges.map((w: wordGroups_wordGroups_edges) => (
        w && w.node ? (
          <Grid item key={w.node.id}>
            <WordGroupCard wordGroup={w.node}/>
          </Grid>
        ) : null
      ))}
    </SectionCardContainer>
  );
};

export default withStyles(styles)(VoggiSection);
