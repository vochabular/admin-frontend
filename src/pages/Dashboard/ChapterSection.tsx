import React from "react";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import { styles } from "styles";
import { GET_CHAPTERS } from "queries/chapters";
import ChapterCard from "components/ChapterCard";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import SectionCardContainer from "components/SectionCardContainer";
import { getChapters } from "queries/__generated__/getChapters";

interface Props extends WithStyles<typeof styles> {}

const ChapterSection: React.FunctionComponent<Props> = ({ classes }) => {
  const { data, error, loading } = useQuery<getChapters>(GET_CHAPTERS);

  if (loading || error || (data && data.chapters && !data.chapters.length)) {
    return (
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={(data && data.chapters && !data.chapters.length) || false}
      />
    );
  }
  return (
    <SectionCardContainer>
      {data &&
        data.chapters &&
        data.chapters.map((c, i: number) =>
          c ? (
            <Grid item key={c.id}>
              <ChapterCard chapter={c} />
            </Grid>
          ) : null
        )}
    </SectionCardContainer>
  );
};

export default withStyles(styles)(ChapterSection);
