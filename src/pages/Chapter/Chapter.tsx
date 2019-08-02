import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { useSubscription } from "react-apollo-hooks";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { styles } from "styles";
import NewChapter from "./NewChapter";
import SubChapterDetail from "./SubChapterDetail";
import { GET_CHAPTER_BY_ID } from "queries/chapters";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import ChapterCard from "components/ChapterCard";
import LinkCard from "components/LinkCard";
import Section from "components/Section";
import SectionCardContainer from "components/SectionCardContainer";
import { Permission } from "rbac-rules";
import Can from "components/Can/Can";
import { subscribeChapterById } from "queries/__generated__/subscribeChapterById";

// These can come from the router... See the route definitions
interface ChapterRouterProps {
  chapterId: string;
  subChapterId: string;
  componentId: string;
}

interface Props
  extends RouteComponentProps<ChapterRouterProps>,
    WithStyles<typeof styles> {}

/**
 * Main chapter component. Gets the chapter id via the route allowing to create links etc. Conditionally loads either the subchapter or the main chapter
 */
const Chapter = ({ classes, match }: Props) => {
  const { chapterId, subChapterId } = match.params;
  const { t } = useTranslation();

  // Either load directly the subchapter or else the chapter
  const { loading, data, error } = useSubscription<subscribeChapterById>(
    GET_CHAPTER_BY_ID,
    {
      variables: {
        id: subChapterId && subChapterId !== "new" ? subChapterId : chapterId
      }
    }
  );

  // If its a new main chapter, don't need to query anything
  // TODO: This violates React Hook rules!!!!
  if (chapterId === "new") {
    return (
      <Can
        perform={Permission.CHAPTER__CREATE}
        yes={() => <NewChapter />}
        no={() => <Redirect to="/403" />}
      />
    );
  }

  if (!data || !data.chapter || loading || error)
    return (
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={!loading && !!data && !data.chapter}
      />
    );

  // TODO: How do we handle new subchapters?
  if (subChapterId === "new") {
    if (!data) return null;
    return (
      <Can
        perform={Permission.CHAPTER__CREATE}
        yes={() => <NewChapter parentChapter={data.chapter || undefined} />}
        no={() => <Redirect to="/403" />}
      />
    );
  }

  // Render the subchapter screen
  if (subChapterId) {
    return (
      <Section title="chapters:chapter" titleTranslatable>
        <SubChapterDetail data={data.chapter} />
      </Section>
    );
  }

  // Else, then render the chapter overview
  return (
    <Section
      title={
        t("chapters:chapter") +
        ` ${data.chapter.titleDE} / ${data.chapter.titleCH}`
      }
    >
      <SectionCardContainer>
        {data.chapter &&
          data.chapter.subChapters &&
          data.chapter.subChapters.map(c => {
            return (
              <Grid item key={c.id}>
                <ChapterCard chapter={c} />
              </Grid>
            );
          })}
        <Can
          perform={Permission.CHAPTER__CREATE}
          yes={() => (
            <Grid item>
              <LinkCard
                path={`/chapters/${data &&
                  data.chapter &&
                  data.chapter.id}/new`}
                icon={<AddIcon />}
                helperText="createNewSubChapter"
              />
            </Grid>
          )}
        />
      </SectionCardContainer>
    </Section>
  );
};

export default withStyles(styles, { withTheme: true })(Chapter);
