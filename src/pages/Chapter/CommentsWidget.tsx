import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTranslation } from "react-i18next";

import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  WithTheme
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Tabs, Tab, Typography } from "@material-ui/core";
import DiscussionList from "src/components/DiscussionList";

interface Props extends WithStyles<typeof styles>, WithTheme {
  /**
   * TODO: This will be the query passed down, including filters for querying the comments...
   */
  query: string;
}

const CommentsWidget = ({ classes, theme, query }: Props) => {
  const { t } = useTranslation();
  const [activeCommentTab, setActiveCommentTab] = React.useState(0);

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    setActiveCommentTab(newValue);
  }

  function handleTabIndexChange(index: number) {
    setActiveCommentTab(index);
  }

  return (
    <Paper square className={classes.header}>
      <Tabs
        value={activeCommentTab}
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab label={t("active")} />
        <Tab label={t("all")} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeCommentTab}
        onChangeIndex={handleTabIndexChange}
      >
        <DiscussionList
          query={query}
          variables={"TODO: FILTER BY Active AND Context"}
        />
        <DiscussionList
          query={query}
          variables={"TODO: ALL (WITH CONTEXT...)"}
        />
      </SwipeableViews>
    </Paper>
  );
};

export const styles = (theme: Theme) =>
  createStyles({
    header: {
      height: "100%",
      backgroundColor: theme.palette.grey[700]
    }
  });

export default withStyles(styles, { withTheme: true })(CommentsWidget);
