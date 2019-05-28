import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { useQuery } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import { styles } from "../../styles";

interface Props extends WithStyles<typeof styles> {}

const VoggiSection: React.FunctionComponent<Props> = ({ classes }) => {
  return <div />;
};

export default withStyles(styles)(VoggiSection);
