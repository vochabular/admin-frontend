import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "src/styles";
import theme from "src/theme";
import ContentEditor from "src/components/ContentEditor/ContentEditor";

interface Props extends WithStyles<typeof styles> {}

const ComponentSelector = ({ classes }: Props) => {
  return <div>Componet selector</div>;
};

export default withStyles(styles, { withTheme: true })(ComponentSelector);
