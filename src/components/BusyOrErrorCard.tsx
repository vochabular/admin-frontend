import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ApolloError } from "apollo-client";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";

import { styles } from "../styles";

interface Props extends WithStyles<typeof styles> {
  error?: ApolloError;
  loading: boolean;
  noResults?: boolean;
  placeholderOnNoResults?: ReactNode;
  showOnNoResults?: boolean;
}

const BusyOrErrorCard: React.FunctionComponent<Props> = ({
  classes,
  error,
  loading,
  noResults,
  placeholderOnNoResults,
  showOnNoResults = true
}) => {
  const { t } = useTranslation();

  if (!error && !loading && !noResults) return null;
  if (!loading && !error && noResults && !showOnNoResults) return null;

  const noResultsElement = placeholderOnNoResults || (
    <Typography>{t("noResultsYetAvailable")}</Typography>
  );

  return (
    <Card>
      <CardContent>
        {error && <Typography>{error.message}</Typography>}
        {loading && <CircularProgress />}
        {!loading && noResults && noResultsElement}
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(BusyOrErrorCard);
