import React from "react";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import { styles } from "styles";
import { GET_CHAPTERS } from "queries/chapters";
import ChapterCard from "components/ChapterCard";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import { chapters_chapters } from "queries/__generated__/chapters";
import SectionCardContainer from "components/SectionCardContainer";

interface Props extends WithStyles<typeof styles> {}

const ChapterSection: React.FunctionComponent<Props> = ({ classes }) => {
  const { data, error, loading } = useQuery(GET_CHAPTERS);

  if (loading || error || !data.chapters.length) {
    return (
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={!loading && data.chapters && !data.chapters.length}
      />
    );
  }
  return (
    <SectionCardContainer>
      {data.chapters.map((c: chapters_chapters, i: number) => (
        <Grid item key={i}>
          <ChapterCard chapter={c} />
        </Grid>
      ))}
    </SectionCardContainer>
  );
};

export default withStyles(styles)(ChapterSection);
