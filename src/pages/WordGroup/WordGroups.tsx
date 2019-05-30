import * as React from "react";
import {Link as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useQuery} from "react-apollo-hooks";

import {withStyles, WithStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import {styles} from "src/styles";
import {GET_WORDGROUPS} from "src/queries/wordgroups";
import WordGroupCard from "src/components/WordGroupCard";
import BusyOrErrorCard from "src/components/BusyOrErrorCard";
import {wordGroups_wordGroups} from "src/queries/__generated__/wordGroups";

export interface wordgroups {
    wordgroups: (wordGroups_wordGroups | null)[] | null;
}

interface Props extends WithStyles<typeof styles> {
    wordgroup: wordGroups_wordGroups; // TODO: Should use the generated type!
}

interface Props extends WithStyles<typeof styles> {
}

const WordGroups = ({classes}: Props) => {
    const {t} = useTranslation();

    const {data, error, loading} = useQuery(GET_WORDGROUPS);

    // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
    // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
    // <Button component={Link} {...{ to: "/about" } as any} />
    let content;
    if (loading || error || !data.wordGroups.length)
        content = (<BusyOrErrorCard
            loading={loading}
            error={error}
            noResults={!loading && data.wordGroups && !data.wordGroups.length}
        />);
    else
        content = (data &&
            data.wordGroups &&
            data.wordGroups.map((c: wordGroups_wordGroups) => (
                <WordGroupCard key = {c.id} wordgroup={c}/>
            )));
    return (
        <div>
            <Typography variant="h3" gutterBottom>
                {t("chapters:chaptersOverview")}
            </Typography>
            <Grid container spacing={16}>
                <Grid item xs={12} md={6} lg={6}>
                    {content}
                </Grid>
            </Grid>
            <Fab
                size="large"
                className={classes.fab}
                color="primary"
                aria-label="Add"
                component={RouterLink}
                {...{to: "/wordgroups/new"} as any}
            >
                <AddIcon/>
            </Fab>
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(WordGroups);
