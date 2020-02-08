import * as React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Formik, Form, Field, FormikActions as FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import { useMutation } from "@apollo/react-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { styles } from "styles";
import i18next from "i18n";
import history from "myHistory";
import ErrorMessage from "components/ErrorMessage";
import { UPSERT_WORD } from "../../queries/wordgroups";
import { RouteComponentProps } from "react-router";

export const WordGroupSchema = Yup.object().shape({
  titleCh: Yup.string()
    .min(4, i18next.t("tooShort"))
    .max(50, i18next.t("tooLong"))
    .required(i18next.t("required")),
  titleDe: Yup.string()
    .min(4, i18next.t("tooShort"))
    .max(50, i18next.t("tooLong"))
    .required(i18next.t("required"))
});

interface WordGroupRouterProps {
  id: string;
}

interface Props
  extends RouteComponentProps<WordGroupRouterProps>,
    WithStyles<typeof styles> {
  values: any;
}

const defaultValues = { text: "", audio: "", example_sentence: "" };

const WordEditor = ({ classes, match, values = defaultValues }: Props) => {
  const { t } = useTranslation();

  // TODO: Unfortunately, @apollo/react-hooks doesn't support yet the error, loading object in mutations (unlike with query...)
  const [upsertWord] = useMutation(UPSERT_WORD);

  async function handleSave(values: any, actions: FormikHelpers<any>) {
    // TODO: This verbose stuff won't be necessary anymore as soon useMutation also returns a error/loading object.
    try {
      await upsertWord({ variables: { input: values } });
      history.push(`/wordgroups/${match.params.id}`);
    } catch (e) {
      actions.setSubmitting(false);
      actions.setStatus({ response: `${t("serverError")}: ${e.message}` });
    }
  }

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Typography variant="h3">{t("words:createNewWord")}</Typography>
        <CardContent>
          <Formik
            initialValues={{
              textDE: "",
              exampleSentenceDE: "",
              audioDE: null,
              textCH: "",
              exampleSentenceCH: "",
              audioCH: null
            }}
            validationSchema={WordGroupSchema}
            onSubmit={(values, actions) => handleSave(values, actions)}
          >
            {({ submitForm, values, isSubmitting, status }) => (
              <Form>
                <Field
                  type="text"
                  name="textDE"
                  label={t("words:textDE")}
                  helperText={t("words:textDEHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="text"
                  name="exampleSentenceDE"
                  label={t("words:exampleSentenceDE")}
                  helperText={t("words:exampleSentenceDEHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="file"
                  name="audioDE"
                  label={t("words:audioDE")}
                  helperText={t("words:audioDEHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="text"
                  name="textCH"
                  label={t("words:textCH")}
                  helperText={t("words:textCHHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="text"
                  name="exampleSentenceCH"
                  label={t("words:exampleSentenceCH")}
                  helperText={t("words:exampleSentenceCHHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="file"
                  name="audioCH"
                  label={t("words:audioCH")}
                  helperText={t("words:audioCHHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
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
          </Formik>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(WordEditor);
