import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import { styles } from "src/styles";
import { UPSERT_CHAPTER } from "src/queries/chapters";
import { CircularProgress } from "@material-ui/core";

interface Props extends WithStyles<typeof styles> {}

const NewChapter = ({ classes }: Props) => {
  const { t } = useTranslation();
  const [values, setValues] = React.useState({
    chapterNumber: "",
    title: "",
    description: ""
  });

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      [name]: event.currentTarget.value
    });
  };
  // Since useMutation currently doesn't return the second arguments such as loading, we can not use react-apollo-hooks for now...
  // https://github.com/trojanowski/react-apollo-hooks/issues/90
  // const upsertChapter = useMutation;
  return (
    <React.Fragment>
      <Typography variant="h3">{t("chapters:newChapterTitle")}</Typography>
      <Card>
        <CardContent>
          <form autoComplete="off">
            <TextField
              required
              type="number"
              id="chapterNumber"
              label={t("chapters:chapterNumber")}
              value={values.chapterNumber}
              onChange={handleChange("chapterNumber")}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="title"
              label={t("title")}
              value={values.title}
              placeholder={t("title")}
              onChange={handleChange("title")}
              margin="normal"
              fullWidth
              inputProps={{
                maxLength: 20
              }}
            />
            <TextField
              required
              id="description"
              label={t("description")}
              value={values.description}
              placeholder={t("chapters:chapterDescriptionPlaceholder")}
              onChange={handleChange("description")}
              margin="normal"
              fullWidth
              multiline
              inputProps={{
                maxLength: 300
              }}
              rows={3}
              rowsMax={6}
            />
            <Mutation mutation={UPSERT_CHAPTER}>
              {(createChapter, { data, loading }) => (
                <React.Fragment>
                  <Button
                    variant="contained"
                    size="large"
                    //className={classes.buttonSuccess}
                    color="primary"
                    disabled={loading}
                    onClick={() =>
                      createChapter({
                        variables: {
                          input: { chapterData: { title: values.title } }
                        }
                      })
                    }
                  >
                    {loading ? <CircularProgress size={24} /> : <SaveIcon />}
                    {t("save")}...
                  </Button>
                </React.Fragment>
              )}
            </Mutation>
          </form>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(NewChapter);
