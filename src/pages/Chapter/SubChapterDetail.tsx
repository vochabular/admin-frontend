import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";

import { styles } from "src/styles";
import theme from "src/theme";
import ContentEditor from "src/components/ContentEditor/ContentEditor";
import Section from "src/components/Section";
import { useTranslation } from "react-i18next";
import { formatAgo } from "src/date-fns";

const mockData = [
  {
    id: 1,
    title: "TEST 1",
    components: [
      {
        type: "title",
        data: { settings: { languages: ["de", "ch", "native"] } }
      },
      { type: "text", data: "Sub comp 2" }
    ]
  },
  { id: 2, title: "TEST 2" }
];

interface Props extends WithStyles<typeof styles> {}

/**
 * The subchapter Editor. Depending on the role, should display different "functionality"
 */
const SubChapterDetail = ({ classes }: Props) => {
  const { t } = useTranslation();

  const title = (
    <Grid container justify="space-around">
      <Grid item>
        <Typography>ABCD</Typography>
      </Grid>
      <Grid item>
        <Typography>ABCD</Typography>
      </Grid>
      <Grid item>
        <Typography>{t("lastSaved")}</Typography>
        <Typography>{formatAgo(new Date())}</Typography>
      </Grid>
    </Grid>
  );
  return (
    <React.Fragment>
      <Section titleComponent={title}>
        <ContentEditor data={mockData} />
      </Section>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(SubChapterDetail);
