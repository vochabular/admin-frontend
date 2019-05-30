import * as React from "react";
import {Link as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useQuery} from "react-apollo-hooks";

import {withStyles, WithStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import {styles} from "styles";
import {GET_WORDGROUPS} from "queries/wordgroups";
import WordGroupCard from "components/WordGroupCard";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import {wordGroups_wordGroups} from "queries/__generated__/wordGroups";
import SectionCardContainer from "../../components/SectionCardContainer";
import {chapters_chapters} from "../../queries/__generated__/chapters";
import ChapterCard from "../../components/ChapterCard";
import auth0Client from "../../auth/Auth";
import LinkCard from "../../components/LinkCard";
import Section from "../../components/Section";


interface Props extends WithStyles<typeof styles> {
    wordgroup: wordGroups_wordGroups;
}

const WordGroups = ({classes}: Props) => {
    const {t} = useTranslation();

    const {data, error, loading} = useQuery(GET_WORDGROUPS);

    // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
    // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
    // <Button component={Link} {...{ to: "/about" } as any} />
    let content;
    return (
        <Section title="chapters:chaptersOverview" titleTranslatable={true}>
            <SectionCardContainer>
                {content}
                {["admin"].includes(auth0Client.getCurrentRole() || "") ? (
                    <Grid item>
                        <LinkCard
                            path="/chapters/new"
                            icon={<AddIcon />}
                            helperText="createNewChapter"
                        />
                    </Grid>
                ) : null}
            </SectionCardContainer>
        </Section>
    );
    if (loading || error || !data.wordGroups.edges.length)
        content = (<BusyOrErrorCard
            loading={loading}
            error={error}
            noResults={!loading && data.wordGroups.edges && !data.wordGroups.edges.length}
        />);
    else
        content = (data &&
            data.wordGroups.edges &&
            data.wordGroups.edges.map((w: wordGroups_wordGroups) => (
                <Grid item key={w.node.id}>
                    <WordGroupCard wordgroup={w.node}/>
                </Grid>
            )));
};

export default withStyles(styles, {withTheme: true})(WordGroups);
