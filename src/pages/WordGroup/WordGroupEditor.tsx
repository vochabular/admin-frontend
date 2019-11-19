import * as React from "react";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Formik, Form, Field, FormikActions} from "formik";
import {TextField} from "formik-material-ui";
import {useMutation, useQuery} from "@apollo/react-hooks";

import {withStyles, WithStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import {styles} from "styles";
import i18next from "i18n";
import history from "myHistory";
import ErrorMessage from "components/ErrorMessage";
import {UPSERT_WORDGROUP} from "../../queries/wordgroups";
import CustomSelect from "../../components/SearchableMultiSelect";
import {GET_LANGUAGES} from "../../queries/languages";
import {getLanguages} from "../../queries/__generated__/getLanguages";

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


interface Props extends WithStyles<typeof styles> {
}

const WordGroupEditor = ({classes}: Props) => {
  const {t} = useTranslation();

  // const {data, error, loading} = useQuery<getLanguages>(GET_LANGUAGES);
  // const words = data && data.languages && data.languages.length ? data.languages.map(lang => (
  //   {
  //     value: lang.code,
  //     label: lang.name
  //   })) : [];


  // TODO:
  const [upsertWordGroup] = useMutation(UPSERT_WORDGROUP);

  async function handleSave(values: any, actions: FormikActions<any>) {
    // TODO: This verbose stuff won't be necessary anymore as soon useMutation also returns a error/loading object.
    try {
      // values['words'] = [];
      await upsertWordGroup({variables: {input: values}});
      history.push("/wordgroups");
    } catch (e) {
      actions.setSubmitting(false);
      actions.setStatus({response: `${t("serverError")}: ${e.message}`});
    }
  }

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Typography variant="h3">
          {t("wordGroups:newWordGroupTitle")}
        </Typography>
        <CardContent>
          <Formik
            initialValues={{
              title_de: "",
              title_ch: "",
              // words: []
            }}
            validationSchema={WordGroupSchema}
            onSubmit={(values, actions) => handleSave(values, actions)}
            render={({submitForm, values, isSubmitting, status}) => (
              <Form>
                <Field
                  type="text"
                  name="title_de"
                  label={t("wordGroup:titleDe")}
                  helperText={t("wordGroup:titleDeHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="text"
                  name="title_ch"
                  label={t("wordGroup:titleCh")}
                  helperText={t("wordGroup:titleChHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />

                {/*<Field*/}
                {/*  className="custom-select"*/}
                {/*  name="words"*/}
                {/*  options={words}*/}
                {/*  component={CustomSelect}*/}
                {/*  placeholder="Select multi languages..."*/}
                {/*  isMulti={true}*/}
                {/*/>*/}

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

export default withStyles(styles, {withTheme: true})(WordGroupEditor);
