import React from "react";

import { withStyles, WithStyles } from "@material-ui/styles";

import { styles } from "styles";

interface Props extends WithStyles<typeof styles> {}

const VoggiSection: React.FunctionComponent<Props> = ({ classes }) => {
  return <div />;
};

export default withStyles(styles)(VoggiSection);
