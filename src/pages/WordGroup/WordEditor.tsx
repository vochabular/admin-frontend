import * as React from "react";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Formik, Form, Field, FormikActions} from "formik";
import {TextField} from "formik-material-ui";
import {useMutation} from "react-apollo-hooks";

import {withStyles, WithStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import {styles} from "styles";
import i18next from "i18n";
import history from "myHistory";
import ErrorMessage from "components/ErrorMessage";
import {
  CREATE_WORD,
  UPDATE_AR_WORD,
  UPDATE_CH_WORD,
  UPDATE_DE_WORD,
  UPDATE_EN_WORD, UPDATE_FA_WORD
} from "../../queries/wordgroups";
import {RouteComponentProps} from "react-router";

export const WordGroupSchema = Yup.object().shape({
  titleCh: Yup.string()
    .min(4, i18next.t("tooShort"))
    .max(50, i18next.t("tooLong"))
    .required(i18next.t("required")),
  titleDe: Yup.string()
    .min(4, i18next.t("tooShort"))
    .max(50, i18next.t("tooLong"))
    .required(i18next.t("required")),
});

interface WordGroupRouterProps {
  id: string;
}

interface Props
  extends RouteComponentProps<WordGroupRouterProps>,
    WithStyles<typeof styles> {
}

const UpsertWord = ({classes, match}: Props) => {
  const {t} = useTranslation();

  // TODO: Unfortunately, react-apollo-hooks doesn't support yet the error, loading object in mutations (unlike with query...)
  const createWord = useMutation(CREATE_WORD);
  const updateWordDe = useMutation(UPDATE_DE_WORD);
  const updateWordCh = useMutation(UPDATE_CH_WORD);
  const updateWordEn = useMutation(UPDATE_EN_WORD);
  const updateWordAr = useMutation(UPDATE_AR_WORD);
  const updateWordFa = useMutation(UPDATE_FA_WORD);

  async function handleSave(values: any, actions: FormikActions<any>) {
    // TODO: This verbose stuff won't be necessary anymore as soon useMutation also returns a error/loading object.
    try {
      await createWord({variables: {input: values}});
      history.push(`/wordgroups/${match.params.id}`);
    } catch (e) {
      actions.setSubmitting(false);
      actions.setStatus({response: `${t("serverError")}: ${e.message}`});
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
              audioCH: null,
            }}
            validationSchema={WordGroupSchema}
            onSubmit={(values, actions) => handleSave(values, actions)}
            render={({submitForm, values, isSubmitting, status}) => (
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
                  <ErrorMessage error={status.response}/>
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

export default withStyles(styles, {withTheme: true})(UpsertWord);
