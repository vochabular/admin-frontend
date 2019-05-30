import React from "react";
import { useTranslation } from "react-i18next";
import { ApolloError } from "apollo-boost";

import { withStyles, WithStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";

import { styles } from "../styles";

interface Props extends WithStyles<typeof styles> {
  error?: ApolloError;
  loading: boolean;
  noResults?: boolean;
}

const BusyOrErrorCard: React.FunctionComponent<Props> = ({
  classes,
  error,
  loading,
  noResults
}) => {
  const { t } = useTranslation();

  if (!error && !loading && !noResults) return null;

  return (
    <Card>
      <CardContent>
        {error && <Typography>{error.message}</Typography>}
        {loading && <CircularProgress />}
        {noResults && <Typography>{t("noResultsYetAvailable")}</Typography>}
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(BusyOrErrorCard);
