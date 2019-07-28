import * as React from "react";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";

import { styles } from "styles";
import { GET_CHAPTERS } from "queries/chapters";
import ChapterCard from "components/ChapterCard";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import LinkCard from "components/LinkCard";
import Section from "components/Section";
import SectionCardContainer from "components/SectionCardContainer";
import { chapters } from "../../queries/__generated__/chapters";
import Can from "components/Can/Can";
import { Permission } from "rbac-rules";

interface Props extends WithStyles<typeof styles> {}

const Chapters = ({ classes }: Props) => {
  const { data, error, loading } = useQuery<chapters>(GET_CHAPTERS);

  // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
  // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
  // <Button component={Link} {...{ to: "/about" } as any} />
  return (
    <Section title="chapters:chaptersOverview" titleTranslatable={true}>
      <SectionCardContainer>
        <BusyOrErrorCard
          loading={loading}
          error={error}
          noResults={
            !loading && data && !!data.chapters && !data.chapters.edges.length
          }
        />
        {data &&
          data.chapters &&
          data.chapters.edges &&
          data.chapters.edges.map((c: any) => (
            <Grid item key={c.node.id}>
              <ChapterCard chapter={c.node} />
            </Grid>
          ))}
        <Can
          perform={Permission.CHAPTER__CREATE}
          yes={() => (
            <Grid item>
              <LinkCard
                path="/chapters/new"
                icon={<AddIcon />}
                helperText="createNewChapter"
              />
            </Grid>
          )}
          no={() => console.log("Nothing!!!")}
        />
      </SectionCardContainer>
    </Section>
  );
};

export default withStyles(styles, { withTheme: true })(Chapters);
