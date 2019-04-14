import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import LoginIcon from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import { RouteComponentProps } from "react-router-dom";

import { styles } from "src/styles";
import theme from "src/theme";
import NewChapter from "./NewVocabulary";

// These can come from the router... See the route definitions
interface ChapterRouterProps {
    id: string;
}

interface Props
    extends RouteComponentProps<ChapterRouterProps>,
        WithStyles<typeof styles> {}

const Chapter = ({ classes, match }: Props) => {
    if (match.params.id === "new") {
        return <NewChapter />;
    }
    return (
        <React.Fragment>
            <Typography variant="h3">Kapitel {match.params.id}</Typography>
        </React.Fragment>
    );
};

export default withStyles(styles, { withTheme: true })(Chapter);
