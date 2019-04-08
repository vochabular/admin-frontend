import * as React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Formik, Form, Field, FormikActions } from "formik";
import { TextField } from "formik-material-ui";
import { useMutation } from "react-apollo-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { styles } from "src/styles";
import { UPSERT_CHAPTER } from "src/queries/chapters";
import i18next from "src/i18n";
import history from "src/history";
import ErrorMessage from "src/components/ErrorMessage";

export const ChapterSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, i18next.t("tooShort"))
    .max(50, i18next.t("tooLong"))
    .required(i18next.t("required")),
  number: Yup.number()
    .min(1, i18next.t("tooLow"))
    .max(20, i18next.t("tooHigh"))
    .required(i18next.t("required")),
  description: Yup.string().max(200, i18next.t("tooLong"))
});

interface Props extends WithStyles<typeof styles> {}

const NewChapter = ({ classes }: Props) => {
  const { t } = useTranslation();

  // TODO: Unfortunately, react-apollo-hooks doesn't support yet the error, loading object in mutations (unlike with query...)
  const upsertChapter = useMutation(UPSERT_CHAPTER);

  async function handleSave(values: any, actions: FormikActions<any>) {
    // TODO: This verbose stuff won't be necessary anymore as soon useMutation also returns a error/loading object.
    try {
      await upsertChapter({ variables: { input: values } });
      history.push("/chapters");
    } catch (e) {
      actions.setSubmitting(false);
      actions.setStatus({ response: `${t("serverError")}: ${e.message}` });
    }
  }

  // Since useMutation currently doesn't return the second arguments such as loading, we can not use react-apollo-hooks for now...
  // https://github.com/trojanowski/react-apollo-hooks/issues/90
  // const upsertChapter = useMutation;
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Typography variant="h3">{t("chapters:newChapterTitle")}</Typography>
        <CardContent>
          <Formik
            initialValues={{
              number: "",
              title: "",
              description: ""
            }}
            validationSchema={ChapterSchema}
            onSubmit={(values, actions) => handleSave(values, actions)}
            render={({ submitForm, values, isSubmitting, status }) => (
              <Form>
                <Field
                  type="number"
                  name="number"
                  label={t("chapter:chapterNumber")}
                  helperText={t("chapter:chapterNumberHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="text"
                  name="title"
                  label={t("chapter:title")}
                  helperText={t("chapter:titleHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="text"
                  name="description"
                  label={t("chapter:description")}
                  helperText={t("chapter:descriptionHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                  multiline
                  rows="6"
                />

                {status && status.response && (
                  <ErrorMessage error={status.response} />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  {t("save")}
                </Button>
              </Form>
            )}
          />
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(NewChapter);
