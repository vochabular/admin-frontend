import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Paper";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import LoginIcon from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";

import { styles } from "src/styles";
import theme from "src/theme";

interface Props extends WithStyles<typeof styles> {}

const Chapters = ({ classes }: Props) => {
  // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
  // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
  // <Button component={Link} {...{ to: "/about" } as any} />
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Kapitelübersicht
      </Typography>
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <Card>
            <CardActionArea
              component={RouterLink}
              {...{ to: "/chapters/1" } as any}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Kapitel 1
                </Typography>
                <Typography variant="h5" component="h2">
                  Begrüssung
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardActionArea
              component={RouterLink}
              {...{ to: "/chapters/new" } as any}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Kapitel ...
                </Typography>
                <Typography variant="h5" component="h2">
                  Neues Kapitel anlegen
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Chapters);
