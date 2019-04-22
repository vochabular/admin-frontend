import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useQuery} from "react-apollo-hooks";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import LoginIcon from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import { RouteComponentProps } from "react-router-dom";

import { styles } from "src/styles";
import theme from "src/theme";
import NewWordGroup from "./NewWordGroup";
import {GET_WORDGROUP} from "src/queries/wordgroups";
import {useTranslation} from "react-i18next";
import BusyOrErrorCard from "src/components/BusyOrErrorCard";
import WordGroupCard from "src/components/WordGroupCard";

// These can come from the router... See the route definitions
interface WordGroupRouterProps {
    id: string;
}

export interface wordgroups_wordgroups_wordgroupSet {
    __typename: "WordGroupType";
    id: string;
    titleCh: string;
    titleDe: string;
}

export interface wordgroups_wordgroups {
    __typename: "WordGroupType";
    id: string;
    titleCh: string;
    titleDe: string;
    chapterSet: (wordgroups_wordgroups_wordgroupSet | null)[] | null;
}

export interface wordgroups {
    wordgroups: (wordgroups_wordgroups | null)[] | null;
}

interface Props
    extends RouteComponentProps<WordGroupRouterProps>,
        WithStyles<typeof styles> {}

const WordGroup = ({ classes, match }: Props) => {
    const {t} = useTranslation();
    const {data, error, loading} = useQuery(GET_WORDGROUP);

    if (match.params.id === "new") {
        return <NewWordGroup />;
    }

    if (loading || error || !data.wordGroups.length)
        return (<BusyOrErrorCard
            loading={loading}
            error={error}
            noResults={!loading && data.wordGroups && !data.wordGroups.length}
        />);

    return (
        data &&
            data.wordGroups &&
            data.wordGroups.map((c: wordgroups_wordgroups) => (
                <WordGroupCard wordgroup={c}/>
            )));
    <React.Fragment>
        <Typography variant="h3">voCHi Liste {match.params.id}</Typography>
    </React.Fragment>
};

export default withStyles(styles, { withTheme: true })(WordGroup);
