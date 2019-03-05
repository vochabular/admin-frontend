import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../../styles";

// TODO: We should have the AppBar in a own component. However, that messes up the layout...
// import AppBar from "../components/AppBar";

interface Props extends WithStyles<typeof styles> {}

const Settings: React.FunctionComponent<Props> = ({ classes }) => {
  return <div>Here we will put the settings...</div>;
};

export default withStyles(styles)(Settings);
