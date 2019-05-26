import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";

import { styles } from "src/styles";
import theme from "src/theme";
import ContentEditor from "src/components/ContentEditor/ContentEditor";
import Section from "src/components/Section";
import { useTranslation } from "react-i18next";
import { formatAgo } from "src/date-fns";
import TimestampAgo from "src/components/TimestampAgo";

const mockData = {
  titleCh: "Kapitel 1",
  titleDe: "Kapitel 1",
  components: [
    {
      id: 1,
      type: "title",
      data: { settings: { languages: ["de", "ch", "native"] } }
    },
    { id: 2, type: "text", data: "Sub comp 2" }
  ],
  lastSaved: "2019-05-26T18:56:30"
};

interface Props extends WithStyles<typeof styles> {}

/**
 * The subchapter Editor. Depending on the role, should display different "functionality"
 */
const SubChapterDetail = ({ classes }: Props) => {
  const { t } = useTranslation();

  const data = mockData;

  const title = (
    <Grid container justify="space-around">
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Typography variant="caption">
            {t("titleDe")}
            {":"}
          </Typography>
          <Typography variant="body1">{data.titleDe}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Typography variant="caption">
            {t("titleCh")}
            {":"}
          </Typography>
          <Typography variant="body1">{data.titleCh}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Typography variant="caption">
            {t("lastSaved")}
            {":"}
          </Typography>
          <TimestampAgo date={new Date(data.lastSaved || 0)} variant="body1" />
        </Grid>
      </Grid>
    </Grid>
  );
  return (
    <React.Fragment>
      <Section titleComponent={title}>
        <ContentEditor data={data} />
      </Section>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(SubChapterDetail);
