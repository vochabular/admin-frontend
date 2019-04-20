import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "src/styles";
import theme from "src/theme";

interface Props extends WithStyles<typeof styles> {}

const CommentList = ({ classes }: Props) => {
  return <div>CommentList</div>;
};

export default withStyles(styles, { withTheme: true })(CommentList);
