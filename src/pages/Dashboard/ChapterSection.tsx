import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";
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

  const hasChapters = !!data?.chapters?.length;
  if (loading || error || !hasChapters) {
    return <BusyOrErrorCard loading={loading} error={error} noResults={!hasChapters} />;
  }

  return (
    <SectionCardContainer>
      {data?.chapters?.filter(Boolean).map((c) => (
        <Grid item key={c.id}>
          <ChapterCard chapter={c} />
        </Grid>
      ))}
    </SectionCardContainer>
  );
};

export default withStyles(styles)(ChapterSection);
