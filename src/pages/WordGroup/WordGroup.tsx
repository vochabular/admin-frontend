import * as React from "react";

import {withStyles, WithStyles} from "@material-ui/core/styles";
import {useQuery} from "react-apollo-hooks";
import {RouteComponentProps} from "react-router-dom";

import {styles} from "styles";
import NewWordGroup from "./NewWordGroup";
import {GET_WORDGROUP} from "queries/wordgroups";
import BusyOrErrorCard from "components/BusyOrErrorCard";

// These can come from the router... See the route definitions
interface WordGroupRouterProps {
    id: string;
}

interface Props
    extends RouteComponentProps<WordGroupRouterProps>,
        WithStyles<typeof styles> {
}

const WordGroup = ({classes, match}: Props) => {

    const {data, error, loading} = useQuery(GET_WORDGROUP, {
        variables: {
            'id': match.params.id
        },
        skip: match.params.id === "new"
    });

    if (match.params.id === "new") {
        return <NewWordGroup/>;
    }

    if (loading || error || !data.wordGroup)
        return (<BusyOrErrorCard
            loading={loading}
            error={error}
            noResults={!loading && data.wordGroup.edges && !data.wordGroup.edges}
        />);

    return (
        data &&
        data.wordGroup.edges &&
        <NewWordGroup/>);
};

export default withStyles(styles, {withTheme: true})(WordGroup);
