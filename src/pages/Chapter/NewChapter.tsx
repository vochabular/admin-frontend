import * as React from "react";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { styles } from "styles";

import { subscribeChapterById_chapter_parentChapter } from "queries/__generated__/subscribeChapterById";
import { ChapterForm } from "components/forms/ChapterForm";

interface Props extends WithStyles<typeof styles> {
  parentChapter?: subscribeChapterById_chapter_parentChapter;
}

const NewChapter = ({ classes, parentChapter }: Props) => {
  const { t } = useTranslation("chapter");
  const isSubChapter = !!parentChapter;

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Typography variant="h3">
          {isSubChapter
            ? t("newSubChapterTitle") +
              ` ${parentChapter!.number}: ${parentChapter!.description!}`
            : t("newChapterTitle")}
        </Typography>
        <CardContent>
          <ChapterForm parentChapter={parentChapter} />
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(NewChapter);
