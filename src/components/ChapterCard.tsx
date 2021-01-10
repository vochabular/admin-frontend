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

interface Props extends WithStyles<typeof styles> {
  chapter: getChapters_chapters | subscribeChapterById_chapter_subChapters;
  // | subscribeChapterById_chapter; // TODO: typing
}

const ChapterCard: React.FC<Props> = ({ classes, chapter }) => {
  const { t } = useTranslation("chapter");

  // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
  // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
  // <Button component={Link} {...{ to: "/about" } as any} />
  const isSubChapter = !!chapter.parentChapter;
  const path = isSubChapter
    ? `/chapters/${chapter.parentChapter && chapter.parentChapter.id}/${chapter.id}`
    : `/chapters/${chapter.id}`;

  const rootComponents = hasComponents(chapter)
    ? chapter.components.filter(({ type }) => type.base)
    : [];
  const rootComponentCount = rootComponents.reduce((acc, component) => {
    const typeName = component.type.name;
    return { ...acc, [typeName]: (acc[typeName] || 0) + 1 };
  }, {} as { [key: string]: number });

  return (
    <Card>
      <CardActionArea component={RouterLink} {...({ to: path } as any)}>
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
          <ul>
            {Object.entries(rootComponentCount).map(([typeName, count]) => (
              <li key={typeName}>
                {typeName}: {count}
              </li>
            ))}
          </ul>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// TODO
const hasComponents = (chapter: any): chapter is getChapters_chapters =>
  !!chapter.components;

export default withStyles(styles, { withTheme: true })(ChapterCard);
