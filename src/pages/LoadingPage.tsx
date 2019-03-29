import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

function LoadingPage() {
  return (
    <div className="LoadingSpinnerFull">
      <CircularProgress />
    </div>
  );
}

export default LoadingPage;
