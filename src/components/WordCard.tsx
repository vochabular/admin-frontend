import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import { styles } from "styles";
import { subscribeWordGroupById_wordGroup_words_word } from "queries/__generated__/subscribeWordGroupById";
import {useTranslation} from "react-i18next";

interface Props extends WithStyles<typeof styles> {
  word: subscribeWordGroupById_wordGroup_words_word;
  id: string;
}

const WordCard = ({ classes, word, id }: Props) => {
  const { t } = useTranslation();
  // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
  // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
  // <Button component={Link} {...{ to: "/about" } as any} />
  return (
    <Card>
      <CardActionArea
        component={RouterLink}
        {...{ to: `/word/${id}` } as any}
      >
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {word.translations.length ? word.translations.map(t => (
              <>
                {t.text}
                <br />
              </>
            )): t("words:emptyWord") }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(WordCard);
