import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import LoginIcon from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";

import { styles } from "../styles";
import theme from "../theme";
import auth0Client from "../auth/Auth";

interface Props extends WithStyles<typeof styles> {}

const LandingPage = ({ classes }: Props) => (
  <div className={classes.container}>
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4">Vochabular</Typography>
        <Typography variant="subtitle1">Dashboard</Typography>
        <div className={classes.logoContainer}>
          <Avatar
            alt="Vochabular Logo"
            src={process.env.PUBLIC_URL + "/logo.svg"}
            className={classes.landingLogo}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => auth0Client.login()}
        >
          <LoginIcon style={{ marginRight: theme.spacing(1) }} /> Anmelden via
          Auth0
        </Button>
      </CardActions>
    </Card>
  </div>
);

export default withStyles(styles, { withTheme: true })(LandingPage);
