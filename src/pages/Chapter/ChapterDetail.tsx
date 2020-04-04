import * as React from "react";

import {
  Grid,
  Typography,
  Toolbar,
  AppBar,
  makeStyles,
  Theme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

import ContentEditor from "components/ContentEditor/ContentEditor";
import TimestampAgo from "components/TimestampAgo";
import CommentsWidget from "pages/Chapter/CommentsWidget";
import { subscribeChapterById_chapter } from "queries/__generated__/subscribeChapterById";
import LanguageContextSelector from "components/ContentEditor/LanguageContextSelector";
import ScheduleIcon from "@material-ui/icons/Schedule";
import EditIcon from "@material-ui/icons/Edit";
import { ChapterForm } from "components/forms/ChapterForm";
import { useTranslation } from "react-i18next";
import { useApolloClient } from "@apollo/react-hooks";

export enum Action {
  edit,
  translate,
  approve,
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  titlesContainer: {
    // backgroundColor: "grey",
    // padding: theme.spacing(1),
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // margin: theme.spacing(1)
  },
  seperator: {
    marginHorizontal: theme.spacing(2),
  },
}));

interface Props {
  context: Action;
  data: subscribeChapterById_chapter;
}

/**
 * The subchapter Editor. Depending on the role, should display different "functionality"
 */
const ChapterDetail = ({ context, data }: Props) => {
  const { id, parentChapter, number, description, updated, languages } = data;
  const client = useApolloClient();
  const { t } = useTranslation();
  const classes = useStyles();
  const [isEditing, setIsEditing] = React.useState(false);

  // Set chapter in apollo local cache as well
  React.useEffect(() => {
    client.writeData({ data: { currentChapterId: id } });
    // Cleanup on unmount
    return () => client.writeData({ data: { currentChapterId: null } });
  }, [client, data, id]);

  const title = (
    <Grid container className={classes.container}>
      <Grid container item direction="row" justify="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            {`${
              parentChapter ? `${parentChapter.number}.` : ""
            }${number}: ${description}`}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <ScheduleIcon fontSize="small" />
            </Grid>
            <Grid item>
              <TimestampAgo date={new Date(updated || 0)} variant="caption" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} justify="space-between">
        <Grid item>
          <Grid container className={classes.titlesContainer}>
            <LanguageContextSelector chapterLanguages={languages} />
            <IconButton
              aria-label="edit"
              className={classes.button}
              onClick={() => setIsEditing(true)}
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <LanguageContextSelector />
        </Grid>
      </Grid>
    </Grid>
  );
  return (
    <>
      <AppBar position="static" color="inherit">
        <Toolbar>{title}</Toolbar>
      </AppBar>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} sm={9} style={{ height: "100%" }}>
          <ContentEditor data={data} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CommentsWidget />
        </Grid>
        <Dialog
          open={isEditing}
          onClose={() => setIsEditing(false)}
          aria-labelledby="edit-chapter-titles"
        >
          <DialogTitle id="form-dialog-title">{t("editChapter")}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t("editChapterHelper")}</DialogContentText>
            <ChapterForm
              chapterData={data}
              parentChapter={parentChapter || undefined}
            />
          </DialogContent>
        </Dialog>
      </Grid>
    </>
  );
};

ChapterDetail.whyDidYouRender = {
  // logOnDifferentValues: true
};

export default ChapterDetail;
