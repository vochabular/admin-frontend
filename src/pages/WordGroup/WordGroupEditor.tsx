import * as React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Formik, Form, Field, FormikActions } from "formik";
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
import { UPSERT_WORDGROUP } from "../../queries/wordgroups";
import CustomSelect from "../../components/SearchableMultiSelect";

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

const words = [{ value: "foo", label: "Foo" }, { value: "bar", label: "Bar" }];

interface Props extends WithStyles<typeof styles> {}

const WordGroupEditor = ({ classes }: Props) => {
  const { t } = useTranslation();

  // TODO:
  const [upsertWordGroup] = useMutation(UPSERT_WORDGROUP);

  async function handleSave(values: any, actions: FormikActions<any>) {
    // TODO: This verbose stuff won't be necessary anymore as soon useMutation also returns a error/loading object.
    try {
      await upsertWordGroup({ variables: { input: values } });
      history.push("/wordgroups");
    } catch (e) {
      actions.setSubmitting(false);
      actions.setStatus({ response: `${t("serverError")}: ${e.message}` });
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
              titleDe: "",
              titleCh: "",
              words: []
            }}
            validationSchema={WordGroupSchema}
            onSubmit={(values, actions) => handleSave(values, actions)}
            render={({ submitForm, values, isSubmitting, status }) => (
              <Form>
                <Field
                  type="text"
                  name="titleDe"
                  label={t("wordGroup:titleDe")}
                  helperText={t("wordGroup:titleDeHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="text"
                  name="titleCh"
                  label={t("wordGroup:titleCh")}
                  helperText={t("wordGroup:titleChHelper")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />

                <Field
                  className="custom-select"
                  name="words"
                  options={words}
                  component={CustomSelect}
                  placeholder="Select multi languages..."
                  isMulti={true}
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

export default withStyles(styles, { withTheme: true })(WordGroupEditor);
