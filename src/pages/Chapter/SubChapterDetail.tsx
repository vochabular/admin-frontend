import * as React from "react";

import { Grid, Typography } from "@material-ui/core";

import ContentEditor from "components/ContentEditor/ContentEditor";
import Section from "components/Section";
import { useTranslation } from "react-i18next";
import TimestampAgo from "components/TimestampAgo";
import CommentsWidget from "pages/Chapter/CommentsWidget";
import { subscribeChapterById_chapter } from "queries/__generated__/subscribeChapterById";

export enum Action {
  edit,
  translate,
  approve
}

interface Props {
  context: Action;
  data: subscribeChapterById_chapter;
}

/**
 * The subchapter Editor. Depending on the role, should display different "functionality"
 */
const SubChapterDetail = ({ context, data }: Props) => {
  const { t } = useTranslation();
  const { titleCH, titleDE, updated } = data;

  const title = (
    <Grid container justify="space-around">
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Typography variant="caption">
            {t("titleDe")}
            {":"}
          </Typography>
          <Typography variant="body1">{titleDE}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Typography variant="caption">
            {t("titleCh")}
            {":"}
          </Typography>
          <Typography variant="body1">{titleCH}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Typography variant="caption">
            {t("lastSaved")}
            {":"}
          </Typography>
          <TimestampAgo date={new Date(updated || 0)} variant="body1" />
        </Grid>
      </Grid>
    </Grid>
  );
  return (
    <>
      <Section titleComponent={title} greyScale={700}>
        <Grid container>
          <Grid item xs={12} sm={9}>
            <ContentEditor data={data} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CommentsWidget />
          </Grid>
        </Grid>
      </Section>
    </>
  );
};

export default SubChapterDetail;
