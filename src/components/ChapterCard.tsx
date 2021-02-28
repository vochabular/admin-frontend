import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import { styles } from "styles";
import { getChapters_chapters } from "queries/__generated__/getChapters";
import {
  subscribeChapterById_chapter,
  subscribeChapterById_chapter_subChapters,
} from "queries/__generated__/subscribeChapterById";
import ChapterComponents from "./ChapterComponents";
import ChapterLanguages from "./ChapterLanguages";

interface Props extends WithStyles<typeof styles> {
  chapter:
    | getChapters_chapters
    | subscribeChapterById_chapter_subChapters
    | subscribeChapterById_chapter;
}

const ChapterCard = ({ classes, chapter }: Props) => {
  const { t } = useTranslation("chapter");

  const subChapterCount = chapter.subChapters.length;
  const isSubChapter = !!chapter.parentChapter;
  const path = isSubChapter
    ? `/chapters/${chapter.parentChapter && chapter.parentChapter.id}/${chapter.id}`
    : `/chapters/${chapter.id}`;

  const rootComponents = hasComponents(chapter)
    ? chapter.components?.filter(({ type }) => type.base)
    : [];

  return (
    <Card>
      <CardActionArea component={RouterLink} to={path}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {t("chapter")}{" "}
            {isSubChapter
              ? `${chapter.parentChapter!.number}.${chapter.number}`
              : chapter.number}
          </Typography>
          <Typography variant="h5" component="h2">
            {chapter.description}
          </Typography>

          {subChapterCount > 0 && (
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              {t("subChapter", { count: subChapterCount })}
            </Typography>
          )}

          {isSubChapter && rootComponents.length > 0 && (
            <>
              <ChapterComponents components={rootComponents} />
              <ChapterLanguages
                components={rootComponents}
                languages={chapter.languages}
              />
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const hasComponents = (
  chapter: any,
): chapter is subscribeChapterById_chapter_subChapters => "components" in chapter;

export default withStyles(styles, { withTheme: true })(ChapterCard);
