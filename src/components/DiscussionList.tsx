import * as React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-apollo-hooks";

import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import { GET_ALL_COMMENTS } from "queries/comments";
import { getAllComments } from "queries/__generated__/getAllComments";
import ErrorMessage from "./ErrorMessage";
import Discussion from "./Discussion";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      //height: "100%",
      backgroundColor: theme.palette.grey[500]
      //height: "300px"
    },
    wrapper: {
      display: "flex",
      flexFlow: "column",
      height: "100%"
    }
  });

interface Props extends WithStyles<typeof styles> {
  query: string;
  variables: string;
}

const DiscussionList = ({ classes, query }: Props) => {
  const { t } = useTranslation();

  // TODO(df): Pass variables (chapter, context) down.
  const { data, loading, error } = useQuery<getAllComments>(query);
  const discussions = data && data.comments;

  return (
    <Box height="100%" className={classes.container}>
      {loading && <CircularProgress />}
      <ErrorMessage error={error && error.message} />
      {discussions ? (
        discussions.edges.map(
          d => d && d.node && <Discussion key={d.node.id} data={d.node} />
        )
      ) : (
        <Typography>{t("noCommentsYet")}</Typography>
      )}
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(DiscussionList);
