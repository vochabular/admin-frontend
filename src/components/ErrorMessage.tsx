import * as React from "react";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "styles";
import { Typography } from "@material-ui/core";

interface Props extends WithStyles<typeof styles> {
  error?: string;
}

const ErrorMessage = ({ classes, error }: Props) => {
  const { t } = useTranslation();

  return <Typography>{t(error || "")}</Typography>;
};

export default withStyles(styles, { withTheme: true })(ErrorMessage);
