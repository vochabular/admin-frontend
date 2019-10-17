import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { TextField, CheckboxWithLabel } from "formik-material-ui";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import BaseComponent, {
  BaseComponentProps,
  BaseSettingsProps
} from "../BaseComponent";
import Text from "components/Text";
import i18next from "i18next";
import { Grid } from "@material-ui/core";
import ContextText from "components/ContextText";

/**
 * Validation Schema definition of the input fields of this component
 */
const TitleSchema = Yup.object().shape({
  isSwissGerman: Yup.boolean(),
  isGerman: Yup.boolean(),
  isNative: Yup.boolean(),
  swissGerman: Yup.object().when("isSwissGerman", {
    is: true,
    then: Yup.string().required(i18next.t("required")),
    otherwise: Yup.string()
  }),
  german: Yup.object().when("isSwissGerman", {
    is: true,
    then: Yup.string().required(i18next.t("required")),
    otherwise: Yup.string()
  })
});

export interface TitleSettingsProps extends BaseSettingsProps {}

/**
 * Setting widget's dynamic component view
 */
export const TitleSettings = React.forwardRef<any, TitleSettingsProps>(
  (props, ref) => {
    const { data, onSubmit } = props;
    const { t } = useTranslation();
    // Hack: Since this is a 1:n relation, but we should only have one text for each title
    const [translations, setTranslations] = React.useState(
      (data.texts[0] && data.texts[0].translations) || []
    );

    const swissGerman =
      translations[translations.findIndex(t => t.language.code === "ch") || 0];
    const german =
      translations[translations.findIndex(t => t.language.code === "de") || 0];

    return (
      <Formik
        ref={ref}
        initialValues={{
          isSwissGerman: !!swissGerman,
          isGerman: !!german,
          isNative: (data.texts[0] && data.texts[0].translatable) || false,
          swissGerman: (swissGerman && swissGerman.textField) || "",
          german: (german && german.textField) || ""
        }}
        validationSchema={TitleSchema}
        onSubmit={(values, actions) => onSubmit(JSON.stringify(values))}
        render={({ submitForm, values, isSubmitting, status }) => (
          <Form>
            <Grid
              item
              container
              spacing={2}
              alignItems="stretch"
              //justify="center"
            >
              <Grid item>
                <Field
                  name={`isSwissGerman`}
                  label={t("editor:swissGerman")}
                  component={CheckboxWithLabel}
                />
                <Field
                  name={`isGerman`}
                  label={t("editor:german")}
                  component={CheckboxWithLabel}
                />
                <Field
                  name={`isNative`}
                  label={t("editor:native")}
                  component={CheckboxWithLabel}
                />
              </Grid>
              <Grid item>
                <Field
                  name={`swissGerman`}
                  label={t("editor:swissGerman")}
                  helperText={t("editor:swissGerman")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                  disabled={!values.isSwissGerman}
                />
                <Field
                  name={`german`}
                  label={t("editor:german")}
                  helperText={t("editor:german")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                  disabled={!values.isGerman}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      />
    );
  }
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexGrow: 1
    // backgroundColor: "white"
  }
}));

export interface TitleComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor
 */
const TitleComponent = ({ data, ...otherProps }: TitleComponentProps) => {
  const classes = useStyles();

  const translations = (data.texts[0] && data.texts[0].translations) || [];
  const preview = (
    <Box className={classes.container} bgcolor="text.primary" p={2} m={1}>
      <Grid xs={12} item container direction="row">
        <ContextText translations={translations} wantedLanguage="ch" />
        <Text translate={false}> / </Text>
        <ContextText translations={translations} wantedLanguage="de" />
        <Text translate={false}> / </Text>
        <ContextText translations={translations} />
      </Grid>
    </Box>
  );

  return <BaseComponent preview={preview} data={data} {...otherProps} />;
};

export default TitleComponent;
