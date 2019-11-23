import * as React from "react";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Formik, Form, Field, FormikActions} from "formik";
import {TextField} from "formik-material-ui";
import {useMutation, useSubscription, useLazyQuery, useApolloClient} from "@apollo/react-hooks";

import {withStyles, WithStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';

import {styles} from "styles";
import i18next from "i18n";
import history from "myHistory";
import ErrorMessage from "components/ErrorMessage";
import {GET_WORD_BY_ID, UPSERT_WORD, GET_MEDIA_URL} from "../../queries/wordgroups";
import {RouteComponentProps} from "react-router";
import {subscribeWordById, subscribeWordById_word_translations} from "../../queries/__generated__/subscribeWordById";
import BusyOrErrorCard from "../../components/BusyOrErrorCard";
import {queryMediaURL} from "../../queries/__generated__/queryMediaURL";

function FileUpload(props: any) {
  const {field, form} = props;
  const handleChange = (e: any) => {
    form.setFieldValue(field.name, e.currentTarget.files[0]);
  };

  return (
    <div>
      <Input type={'file'} onChange={handleChange} fullWidth disableUnderline={true} className="form-control"/>
    </div>
  );
}



const FILE_SIZE = 1 * 1024 * 1024 * 1000000000;
const SUPPORTED_FORMATS = [
  "audio/mpeg"
];

export const WordGroupSchema = Yup.object().shape({
  textDE: Yup.string()
    .min(2, i18next.t("tooShort"))
    .max(100, i18next.t("tooLong"))
    .required(i18next.t("required")),
  textCH: Yup.string()
    .min(2, i18next.t("tooShort"))
    .max(100, i18next.t("tooLong"))
    .required(i18next.t("required")),
  exampleSentenceDE: Yup.string()
    .min(5, i18next.t("tooShort"))
    .max(10000, i18next.t("tooLong")),
  exampleSentenceCH: Yup.string()
    .min(5, i18next.t("tooShort"))
    .max(10000, i18next.t("tooLong")),
  // audioDE: Yup.mixed()
  //   .test({
  //     name: "fileSize",
  //     params: {FILE_SIZE},
  //     message: i18next.t("fileTooLarge"),
  //     test: value => value == null || (value.size <= FILE_SIZE)
  //   })
  //   .test({
  //     name: "fileFormat",
  //     params: {SUPPORTED_FORMATS},
  //     message: i18next.t("unsupportedAudio"),
  //     test: value => value == null || (SUPPORTED_FORMATS.includes(value.type))
  //   }),
  // audioCH: Yup.mixed()
  //   .test({
  //     name: "fileSize",
  //     params: {FILE_SIZE},
  //     message: i18next.t("fileTooLarge"),
  //     test: value => value == null || (value.size <= FILE_SIZE)
  //   })
  //   .test({
  //     name: "fileFormat",
  //     params: {SUPPORTED_FORMATS},
  //     message: i18next.t("unsupportedAudio"),
  //     test: value => value == null || (SUPPORTED_FORMATS.includes(value.type))
  //   })
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


  let apollo_client = useApolloClient();
  // TODO Those stupid queries can only be used in react component. I want to request an url not on rendering but on handle submit if an audio file is uploaded
  function upload_audio(audio_object: any) {

    // const { loading, error, data } = useLazyQuery<queryMediaURL>(GET_MEDIA_URL);
    // let media_url = !loading && data && data.mediaUrl && data.mediaUrl.url ? data.mediaUrl.url : '';
    // alert(media_url);

  }

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
      // await upsertWord({variables: {input: values}});
      console.log(values);

      if (values.audioDE) {
        alert(typeof values.audioDE);
        alert(JSON.stringify(values.audioDE));
        upload_audio(values.audioDE);
      }
      if (values.audioCH) {
        console.log(JSON.stringify(values.audioCH));
        upload_audio(values.audioCH);
      }

      history.push(`/wordgroups/${match.params.wordgroupId}`);
    } catch (e) {
      actions.setSubmitting(false);
      actions.setStatus({response: `${t("serverError")}: ${e.message}`});
    }
  }

  const wordDe = data && data.word ? data.word.translations.find((translation: subscribeWordById_word_translations) => {
    return translation.language.code === 'de';
  }) : "";
  const wordCh = data && data.word ? data.word.translations.find((translation: subscribeWordById_word_translations) => {
    return translation.language.code === 'ch';
  }) : "";


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
                file: null
              }}
              validationSchema={WordGroupSchema}
              onSubmit={(values, actions) => handleSave(values, actions)}
              render={({submitForm, values, isSubmitting, status, setFieldValue}) => (
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
                    component={FileUpload}
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
                  <input id="file" name="file" type="file" onChange={(event: any) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }} className="form-control" />
                  <Field
                    type="file"
                    name="audioCH"
                    label={t("words:audioCH")}
                    helperText={t("words:audioCHHelper")}
                    component={TextField}
                    onChange={(event: any) => {
                      const file  =  event.currentTarget.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
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
