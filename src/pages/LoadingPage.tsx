import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { styles } from "src/styles";
import { withStyles } from "@material-ui/styles";

function LoadingPage() {
  return (
    <div className="LoadingSpinnerFull">
      <CircularProgress />
    </div>
  );
}

export default withStyles(styles)(LoadingPage);
