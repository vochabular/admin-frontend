import * as React from "react";

import Typography from "@material-ui/core/Typography";
import { TypographyProps } from "@material-ui/core/Typography";

import { formatAgo } from "myDateFns";
import useInterval from "hooks/useInterval";

interface Props extends TypographyProps {
  date: Date;
}

/**
 * Wrapper for "timestamps ago", since that needs a timer to update the render every so often
 */
const TimestampAgo = ({ date, ...otherProps }: Props) => {
  const [, updateNow] = React.useState();

  useInterval(() => {
    updateNow(new Date());
  }, 1000);

  return <Typography {...otherProps}> {formatAgo(date)}</Typography>;
};

export default TimestampAgo;
