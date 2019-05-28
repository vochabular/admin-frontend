import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import { styles } from "src/styles";
import ChapterSection from "./ChapterSection";
import VoggiSection from "./VoggiSection";
import ErrorBoundary from "src/components/ErrorBoundary";
import Section from "src/components/Section";

// TODO: We should have the AppBar in a own component. However, that messes up the layout...
// import AppBar from "../components/AppBar";

interface Props extends WithStyles<typeof styles> {}

const Dashboard: React.FunctionComponent<Props> = ({ classes }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Section titleTranslatable={true} title="chapters:chapters">
        <ErrorBoundary>
          <ChapterSection />
        </ErrorBoundary>
      </Section>

      <Divider component="h4" variant="inset" />

      <Section titleTranslatable={true} title="voggi:voggiList">
        <ErrorBoundary>
          <VoggiSection />
        </ErrorBoundary>
      </Section>
    </React.Fragment>
  );
};

export default withStyles(styles)(Dashboard);
