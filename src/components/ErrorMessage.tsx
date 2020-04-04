import * as React from "react";
import { useTranslation } from "react-i18next";
import { ApolloError } from "apollo-client";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.error.main,
    border: "solid",
    borderWidth: 2,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

interface Props {
  error?: string | ApolloError;
}

export default function ErrorMessage({ error }: Props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const errorMessage = typeof error === "string" ? error : error?.message;

  if (!errorMessage) return null;

  return (
    <Typography className={classes.container}>{t(errorMessage)}</Typography>
  );
}
