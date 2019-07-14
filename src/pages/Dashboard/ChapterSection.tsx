import React from "react";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import { styles } from "styles";
import { GET_CHAPTERS } from "queries/chapters";
import ChapterCard from "components/ChapterCard";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import { chapters } from "queries/__generated__/chapters";
import SectionCardContainer from "components/SectionCardContainer";

interface Props extends WithStyles<typeof styles> {}

const ChapterSection: React.FunctionComponent<Props> = ({ classes }) => {
  const { data, error, loading } = useQuery<chapters>(GET_CHAPTERS);

  if (
    loading ||
    error ||
    (data && data.chapters && !data.chapters.edges.length)
  ) {
    return (
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={
          (data && data.chapters && !data.chapters.edges.length) || false
        }
      />
    );
  }
  return (
    <SectionCardContainer>
      {data &&
        data.chapters &&
        data.chapters.edges.map((c, i: number) =>
          c && c.node ? (
            <Grid item key={(c.node && c.node.id) || "-"}>
              <ChapterCard chapter={c.node} />
            </Grid>
          ) : null
        )}
    </SectionCardContainer>
  );
};

export default withStyles(styles)(ChapterSection);
