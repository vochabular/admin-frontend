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

const mockData = {
  comments: [
    {
      __typename: "CommentType",
      id: "1",
      comment: "ATEST COMMENT",
      active: true,
      written: "2019-05-01",
      authorName: {
        __typename: "UserType",
        id: "2",
        firstName: "Hans",
        lastName: "Müller",
        username: "hansmüller",
        email: "hans@müller.com",
        isActive: true
      },
      responses: []
    },
    {
      __typename: "CommentType",
      id: "2",
      comment: "Super toll!",
      active: true,
      written: "2019-05-01",
      authorName: {
        __typename: "UserType",
        id: "2",
        firstName: "Yannick",
        lastName: "Schraner",
        username: "ys",
        email: "ys@schraner.com",
        isActive: true
      },
      responses: [
        {
          __typename: "CommentType",
          id: "3",
          comment: "Hallo Welt?",
          active: true,
          written: "2019-05-10T12:20:00",
          authorName: {
            __typename: "UserType",
            id: "2",
            firstName: "Hans",
            lastName: "Müller",
            username: "hansmüller",
            email: "hans@müller.com",
            isActive: true
          }
        },
        {
          __typename: "CommentType",
          id: "4",
          comment: "Mega wahnsinn!",
          active: true,
          written: "2019-05-10T13:00:00",
          authorName: {
            __typename: "UserType",
            id: "2",
            firstName: "Yannick",
            lastName: "Schraner",
            username: "ys",
            email: "ys@schraner.com",
            isActive: true
          }
        }
      ]
    }
  ]
};

interface Props extends WithStyles<typeof styles> {
  /**
   * TODO: An array of grouped comments
   */
  query: string;
  variables: string;
}

const DiscussionList = ({ classes }: Props) => {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<getAllComments>(GET_ALL_COMMENTS);

  // const discussions = (data && data.comments) || [];
  const discussions = mockData.comments;

  //if (!loading) return <CircularProgress />;
  return (
    <Box height="100%" className={classes.container}>
      {loading && <CircularProgress />}
      <ErrorMessage error={error && error.message} />
      {discussions.map((d: any) => (
        <Discussion key={d.id} data={d} />
      ))}
      {!discussions.length && <Typography>{t("noCommentsYet")}</Typography>}
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(DiscussionList);
