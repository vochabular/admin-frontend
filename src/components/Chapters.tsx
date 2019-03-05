import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import LoginIcon from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";

import { styles } from "src/styles";
import theme from "src/theme";

interface Props extends WithStyles<typeof styles> {}

const Chapters = ({ classes }: Props) => <div>Chapters</div>;

export default withStyles(styles, { withTheme: true })(Chapters);
