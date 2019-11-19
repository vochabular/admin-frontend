import * as React from "react";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Formik, Form, Field, FormikActions} from "formik";
import {TextField} from "formik-material-ui";
import {useMutation, useSubscription} from "@apollo/react-hooks";

import {withStyles, WithStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import {styles} from "styles";
import i18next from "i18n";
import history from "myHistory";
import ErrorMessage from "components/ErrorMessage";
import {GET_WORD_BY_ID, UPSERT_WORD} from "../../queries/wordgroups";
import {RouteComponentProps} from "react-router";
import {subscribeWordById, subscribeWordById_word_translations} from "../../queries/__generated__/subscribeWordById";
import BusyOrErrorCard from "../../components/BusyOrErrorCard";


export const WordGroupSchema = Yup.object().shape({
  title_ch: Yup.string()
    .min(4, i18next.t("tooShort"))
    .max(50, i18next.t("tooLong"))
    .required(i18next.t("required")),
  title_de: Yup.string()
    .min(4, i18next.t("tooShort"))
    .max(50, i18next.t("tooLong"))
    .required(i18next.t("required"))
});

interface WordGroupRouterProps {
  wordgroupId: string;
  wordId: string;
}

interface Props
  extends RouteComponentProps<WordGroupRouterProps>,
    WithStyles<typeof styles> {
  values: any;
}

const defaultValues = {text: "", audio: "", example_sentence: ""};

const WordEditor = ({classes, match, values = defaultValues}: Props) => {
  const {t} = useTranslation();

  const {loading, data, error} = useSubscription<subscribeWordById>(
    GET_WORD_BY_ID,
    {
      variables: {
        id: match.params.wordId
      },
      skip: match.params.wordId === "new"
    }
  );

  // TODO: Unfortunately, @apollo/react-hooks doesn't support yet the error, loading object in mutations (unlike with query...)
  const [upsertWord] = useMutation(UPSERT_WORD);

  async function handleSave(values: any, actions: FormikActions<any>) {
    // TODO: This verbose stuff won't be necessary anymore as soon useMutation also returns a error/loading object.
    try {
      await upsertWord({variables: {input: values}});
      history.push(`/wordgroups/${match.params.wordgroupId}`);
    } catch (e) {
      actions.setSubmitting(false);
      actions.setStatus({response: `${t("serverError")}: ${e.message}`});
    }
  }

  const wordDe = data && data.word ? data.word.translations.find((translation: subscribeWordById_word_translations) => { return translation.language.code === 'de'; }) : "";
  const wordCh = data && data.word ? data.word.translations.find((translation: subscribeWordById_word_translations) => { return translation.language.code === 'ch'; }) : "";



  return (
    <React.Fragment>
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={
          !loading &&
          data &&
          !data.word
        }
      />
      {data &&
      data.word ?
        (<Card className={classes.card}>
          <Typography variant="h3">{t("words:createNewWord")}</Typography>
          <CardContent>
            <Formik
              initialValues={{
                textDE: wordDe ? wordDe.text : "",
                exampleSentenceDE: wordDe && wordDe.exampleSentence ? wordDe.exampleSentence : "",
                audioDE: wordDe && wordDe.audio ? wordDe.audio : undefined,
                textCH: wordCh ? wordCh.text : "",
                exampleSentenceCH: wordCh && wordCh.exampleSentence ? wordCh.exampleSentence : "",
                audioCH: wordCh && wordCh.audio ? wordCh.audio : undefined,
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
        </Card>) : null}
    </React.Fragment>
  );
};

export default withStyles(styles, {withTheme: true})(WordEditor);
