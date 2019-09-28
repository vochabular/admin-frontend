import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { useSubscription } from "@apollo/react-hooks";
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
import { useDispatch } from "react-redux";
import { actions } from "reducers/contentEditorSlice";
import { getChapterById } from "queries/__generated__/getChapterById";

interface ChapterContentProps {
  chapterId: string;
  subChapterId: string | undefined;
}

/**
 * Actually loads the content of the chapter depending whether it is a main chapter or a subchapter...
 */
const ChapterContent = ({ chapterId, subChapterId }: ChapterContentProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Either load directly the subchapter or else the chapter
  const { loading, data, error } = useSubscription<subscribeChapterById>(
    GET_CHAPTER_BY_ID,
    {
      variables: {
        id: subChapterId && subChapterId !== "new" ? subChapterId : chapterId
      }
    }
  );

  if (!data || !data.chapter || loading || error)
    return (
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={!loading && !!data && !data.chapter}
      />
    );

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
    dispatch(actions.setCurrentChapter(subChapterId));
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
 * Chapter wrapper Component, necessary to return early in case of a new chapter. Gets the chapter id via the route allowing to create links etc.
 */
const Chapter = ({ classes, match }: Props) => {
  const { chapterId, subChapterId } = match.params;

  // If its a new main chapter, don't need to query anything
  if (chapterId === "new") {
    return (
      <Can
        perform={Permission.CHAPTER__CREATE}
        yes={() => <NewChapter />}
        no={() => <Redirect to="/403" />}
      />
    );
  }
  return <ChapterContent chapterId={chapterId} subChapterId={subChapterId} />;
};

export default withStyles(styles, { withTheme: true })(Chapter);
