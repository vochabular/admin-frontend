import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";

import { styles } from "src/styles";
import { GET_CHAPTERS } from "src/queries/chapters";
import ChapterCard from "src/components/ChapterCard";
import BusyOrErrorCard from "src/components/BusyOrErrorCard";
import { chapters_chapters } from "src/queries/__generated__/chapters";
import LinkCard from "src/components/LinkCard";
import auth0Client from "src/auth/Auth";
import { GET_SETTINGS } from "src/queries/settings";

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
        <BusyOrErrorCard
          loading={loading}
          error={error}
          noResults={!loading && data.chapters && !data.chapters.length}
        />
        {data &&
          data.chapters &&
          data.chapters.map((c: chapters_chapters) => (
            <Grid item key={c.id}>
              <ChapterCard chapter={c} />
            </Grid>
          ))}
        {["admin"].includes(auth0Client.getCurrentRole() || "") ? (
          <Grid item>
            <LinkCard
              path="/chapters/new"
              icon={<AddIcon />}
              helperText="createNewChapter"
            />
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Chapters);
