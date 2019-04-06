import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {withStyles, WithStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import {styles} from "src/styles";
import ChapterSection from "./ChapterSection";
import VoggiSection from "./VoggiSection";
import ErrorBoundary from "src/components/ErrorBoundary"

// TODO: We should have the AppBar in a own component. However, that messes up the layout...
// import AppBar from "../components/AppBar";

interface Props extends WithStyles<typeof styles> {
}

const Dashboard: React.FunctionComponent<Props> = ({classes}) => {
    const {t} = useTranslation();
    return (
        <React.Fragment>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom component="h2">
                        {t("chapters:chapters")}
                    </Typography>
                    <ErrorBoundary>
                        <ChapterSection/>
                    </ErrorBoundary>

                </Grid>

                <Divider component="h4" variant="inset"/>

                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom component="h2">
                        {t("voggi:voggiList")}
                    </Typography>
                    <ErrorBoundary>
                        <VoggiSection/>
                    </ErrorBoundary>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(Dashboard);
