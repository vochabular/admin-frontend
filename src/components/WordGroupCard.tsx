import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import { styles } from "src/styles";
import { chapters_chapters } from "src/queries/__generated__/chapters"; // TODO: Apollo code gen didn't work.

interface Props extends WithStyles<typeof styles> {
    wordgroup: chapters_chapters; // TODO: Should use the generated type!
}

const WordGroupCard = ({ classes, wordgroup }: Props) => {
    const { t } = useTranslation();

    // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
    // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
    // <Button component={Link} {...{ to: "/about" } as any} />
    return (
        <Card>
            <CardActionArea
                component={RouterLink}
                {...{ to: `/wordgroups/${wordgroup.id}` } as any}
            >
                <CardContent>
                    <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                    >
                        {wordgroup.titleCh}
                        {wordgroup.titleDe}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        TODO: Render here chapter specific stuff
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default withStyles(styles, { withTheme: true })(WordGroupCard);
