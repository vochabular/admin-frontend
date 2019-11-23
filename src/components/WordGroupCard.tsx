import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import { useTranslation } from "react-i18next";

import CardActionArea from "@material-ui/core/CardActionArea";
import { styles } from "styles";
import { subscribeWordGroups_wordGroups } from "queries/__generated__/subscribeWordGroups";
import {subscribeChaptersWordGroupsByChapterId_chapters_wordgroups} from "../queries/__generated__/subscribeChaptersWordGroupsByChapterId";

interface Props extends WithStyles<typeof styles> {
  wordGroup:
    | subscribeWordGroups_wordGroups
    | subscribeChaptersWordGroupsByChapterId_chapters_wordgroups;
}

const WordGroupCard = ({ classes, wordGroup }: Props) => {
  const { t } = useTranslation();
  // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
  // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
  // <Button component={Link} {...{ to: "/about" } as any} />
  return (
    <Card>
      <CardActionArea
        component={RouterLink}
        {...({ to: `/wordgroups/${wordGroup.id}` } as any)}
      >
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {wordGroup} <br />
            {wordGroup} <br />
            {t("wordGroups:nWords") + wordGroup && wordGroup.words
              ? wordGroup.words.length
              : 0}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(WordGroupCard);
