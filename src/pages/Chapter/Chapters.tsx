import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import { styles } from "src/styles";
import { GET_CHAPTERS } from "src/queries/chapters";
import ChapterCard from "src/components/ChapterCard";
import BusyOrErrorCard from "src/components/BusyOrErrorCard";
import { chapters_chapters } from "src/queries/__generated__/chapters";

interface Props extends WithStyles<typeof styles> {}

const Chapters = ({ classes }: Props) => {
  const { t } = useTranslation();

  const { data, error, loading } = useQuery(GET_CHAPTERS);

  // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
  // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
  // <Button component={Link} {...{ to: "/about" } as any} />
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        {t("chapters:chaptersOverview")}
      </Typography>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6} lg={6}>
          <BusyOrErrorCard
            loading={loading}
            error={error}
            noResults={!loading && data.chapters && !data.chapters.length}
          />
          {data &&
            data.chapters &&
            data.chapters.map((c: chapters_chapters) => (
              <ChapterCard chapter={c} />
            ))}
        </Grid>
      </Grid>
      <Fab
        size="large"
        className={classes.fab}
        color="primary"
        aria-label="Add"
        component={RouterLink}
        {...{ to: "/chapters/new" } as any}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Chapters);
