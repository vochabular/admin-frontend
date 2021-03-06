import * as React from "react";
import { useTranslation } from "react-i18next";

import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  WithTheme
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Tabs, Tab } from "@material-ui/core";
import DiscussionList from "components/DiscussionList";
import { GET_ACTIVE_COMMENTS, GET_ALL_COMMENTS } from "queries/comments";

interface ITabPanelProps {
  value: Number;
  index: Number;
  children?: React.ReactNode;
}

const TabPanel = ({ value, index, children }: ITabPanelProps) => {

  return (value === index) ? <>{children}</> : null;
}


const styles = (theme: Theme) =>
  createStyles({
    header: {
      height: "100%",
      backgroundColor: theme.palette.grey[700]
    }
  });

interface Props extends WithStyles<typeof styles>, WithTheme {}

const CommentsWidget = ({ classes, theme }: Props) => {
  const { t } = useTranslation();
  const [activeCommentTab, setActiveCommentTab] = React.useState(0);

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    setActiveCommentTab(newValue);
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
      <TabPanel value={activeCommentTab} index={0}>
      <DiscussionList
        query={GET_ACTIVE_COMMENTS}
        variables={"TODO: FILTER BY Active AND Context"}
      />
      </TabPanel>
      <TabPanel value={activeCommentTab} index={1}>
      <DiscussionList
        query={GET_ALL_COMMENTS}
        variables={"TODO: FILTER BY Active AND Context"}
      />
      </TabPanel>
    </Paper>
  );
};

export default withStyles(styles, { withTheme: true })(CommentsWidget);
