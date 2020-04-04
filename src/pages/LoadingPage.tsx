import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { styles } from "styles";
import { withStyles } from "@material-ui/core/styles";

function LoadingPage() {
  return (
    <div className="LoadingSpinnerFull">
      <CircularProgress />
    </div>
  );
}

export default withStyles(styles)(LoadingPage);
