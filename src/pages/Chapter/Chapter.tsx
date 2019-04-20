import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import { styles } from "src/styles";
import theme from "src/theme";
import NewChapter from "./NewChapter";
import SubChapterEditor from "./SubChapterEditor";
import { GET_CHAPTER_BY_ID } from "src/queries/chapters";
import { chapterById_chapter } from "src/queries/__generated__/chapterById";
import BusyOrErrorCard from "src/components/BusyOrErrorCard";
import ChapterCard from "src/components/ChapterCard";

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
  const { chapterId, subChapterId, componentId } = match.params;
  const { t } = useTranslation();

  // TODO: How do we handle new subchapters?
  if (chapterId === "new") {
    return <NewChapter />;
  }

  // Either load directly the subchapter or else the chapter
  const { loading, data, error } = useQuery(GET_CHAPTER_BY_ID, {
    variables: { id: subChapterId || chapterId }
  });

  if (loading || error)
    return (
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={!loading && data.chapter && !data.chapter.length}
      />
    );

  // Render the subchapter screen
  if (subChapterId) {
    return (
      <React.Fragment>
        <Typography variant="h3">{t("chapters:chapter")}</Typography>
        <SubChapterEditor />
      </React.Fragment>
    );
  }

  // Else, then render the chapter overview
  return (
    <React.Fragment>
      <Typography variant="h3">
        {t("chapters:chapter")} {data.chapter.title}
      </Typography>
      <Grid container spacing={16}>
        {data.chapter.subChapters.map((c: chapterById_chapter) => (
          <Grid item key={c.id}>
            <ChapterCard chapter={c} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Chapter);
