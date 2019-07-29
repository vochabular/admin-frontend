import * as React from "react";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { styles } from "styles";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import SectionCardContainer from "../../components/SectionCardContainer";
import Section from "../../components/Section";
import { GET_CHAPTER_WORDGROUPS } from "../../queries/chapters";
import {
  chapters_wordGroups,
  chapters_wordGroups_chapters_edges
} from "../../queries/__generated__/chapters_wordGroups";
import VoggiChapterCard from "../../components/VoggiChapterCard";

interface Props extends WithStyles<typeof styles> {
  chapter_wordGroup: chapters_wordGroups;
}

const WordGroups = ({ classes }: Props) => {
  const { data, error, loading } = useQuery<chapters_wordGroups>(
    GET_CHAPTER_WORDGROUPS
  );

  // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
  // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
  // <Button component={Link} {...{ to: "/about" } as any} />
  return (
    <Section title="wordGroups:wordGroupsOverview" titleTranslatable={true}>
      <SectionCardContainer>
        <BusyOrErrorCard
          loading={loading}
          error={error}
          noResults={
            !loading &&
            data &&
            !!data.chapters &&
            data.chapters.edges &&
            !data.chapters.edges.length
          }
        />
        {data &&
          data.chapters &&
          data.chapters.edges &&
          data.chapters.edges.map(
            (c: chapters_wordGroups_chapters_edges | null) =>
              c && c.node && c.node.parentChapter ? (
                <Grid item key={c.node.id}>
                  <VoggiChapterCard chapter={c.node} />
                </Grid>
              ) : null
          )}
      </SectionCardContainer>
    </Section>
  );
};

export default withStyles(styles, { withTheme: true })(WordGroups);
