import * as React from "react";

import {withStyles, WithStyles} from "@material-ui/core/styles";
import {useQuery} from "react-apollo-hooks";
import {RouteComponentProps} from "react-router-dom";

import {styles} from "src/styles";
import NewWordGroup from "./NewWordGroup";
import {GET_WORDGROUP} from "src/queries/wordgroups";
import {useTranslation} from "react-i18next";
import BusyOrErrorCard from "src/components/BusyOrErrorCard";
import WordGroupCard from "src/components/WordGroupCard";
import NewChapter from "src/pages/Chapter/NewChapter";

// These can come from the router... See the route definitions
interface WordGroupRouterProps {
    id: string;
}

interface Props
    extends RouteComponentProps<WordGroupRouterProps>,
        WithStyles<typeof styles> {
}

const WordGroup = ({classes, match}: Props) => {
    const {t} = useTranslation();
    if (match.params.id === "new") {
        return <NewWordGroup/>;
    }
    const {data, error, loading} = useQuery(GET_WORDGROUP, {
        variables: {
            'id': match.params.id
        }
    });

    if (loading || error || !data.wordGroup)
        return (<BusyOrErrorCard
            loading={loading}
            error={error}
            noResults={!loading && data.wordGroup && !data.wordGroup}
        />);

    return (
        data &&
        data.wordGroup &&
        <NewWordGroup/>);
};

export default withStyles(styles, {withTheme: true})(WordGroup);
