import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { cloneDeep } from "lodash-es";
import i18next from "i18next";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import BaseComponent, {
  BaseComponentProps,
  BaseSettingsProps
} from "../BaseComponent";
import { LanguageContext } from "theme";
import Diff from "helper/Diff";
import {
  ICrudTextOperations,
  ICrudTranslationOperations,
  IText,
  ITranslation
} from "../Settings";
import MultiTranslationText from "components/MultiTranslationText";
import { transformTranslations } from "./TextComponent";

interface ITitleSettingsFormFields {
  isSwissGerman: boolean;
  isGerman: boolean;
  isNative: boolean;
  swissGerman: ITranslation;
  german: ITranslation;
  shouldInvalidateTranslations?: boolean;
  [key: string]: any;
}

/**
 * Validation Schema definition of the input fields of this component
 * Note the conditional rules
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
 * View for Settings widget
 */
export const TitleSettings = React.forwardRef<any, TitleSettingsProps>(
  (props, ref) => {
    const { data, onSubmit } = props;
    const { t } = useTranslation();

    // Hack: Since this is a 1:n relation, but we should only have one text for each title
    const translations = (data.texts[0] && data.texts[0].translations) || [];
    const { swissGerman, german, nativeLanguages } = transformTranslations(
      translations
    );
    const initialValues: ITitleSettingsFormFields = {
      isSwissGerman: !!swissGerman,
      isGerman: !!german,
      isNative: (data.texts[0] && data.texts[0].translatable) || false,
      swissGerman: swissGerman || {
        text_field: "",
        valid: false,
        languageCode: "ch"
      },
      german: german || { text_field: "", valid: false, languageCode: "de" },
      shouldInvalidateTranslations:
        (data.texts[0] && data.texts[0].translatable) || true
    };

    function handleTitleSave(values: ITitleSettingsFormFields, actions: any) {
      // Initialize interface object
      const texts: ICrudTextOperations = { upsert: [], delete: [] };
      const trans: ICrudTranslationOperations = { upsert: [], delete: [] };

      // get diff of initial and current form values
      const result = new Diff(initialValues, values);

      // skip if nothing has changed
      if (!result.isEqual) {
        let text: IText = cloneDeep(data.texts[0]) || {};
        // Initialize the nested translations empty, since we only need to specify those that need to get upserted.
        text.translations = [];

        // IF flag is active AND value or flag has changed, then we need to upsert the swissGerman translation
        if (
          values.isSwissGerman &&
          result.updated.find(
            r => r.path[0] === "swissGerman" || r.path[0] === "isSwissGerman"
          )
        ) {
          text.translations.push(values.swissGerman);
        }
        // Same for german...
        if (
          values.isGerman &&
          result.updated.find(
            r => r.path[0] === "german" || r.path[0] === "isGerman"
          )
        ) {
          text.translations.push(values.german);
        }

        // Additionally, also the case of disabled flags need to be covered
        result.updated.forEach(i => {
          switch (i.path[0]) {
            // If the flag value has changed to false, then add this translation to the delete object
            case "isSwissGerman":
            case "isGerman":
              if (!i.val) {
                const originalTranslation = data.texts[0].translations.find(
                  t =>
                    t.language.id ===
                    (i.path[0] === "isSwissGerman"
                      ? LanguageContext.ch
                      : LanguageContext.de)
                );
                originalTranslation && trans.delete.push(originalTranslation);
              }
              break;
            case "isNative":
              const { isNative } = values;
              text.translatable = isNative;

              // Remove all native translations if appropriate
              if (!isNative) {
                texts.deleteNativeLanguages = true;
              } else if (isNative) {
                texts.createNativeLanguages = true;
              }
              break;
          }
        });

        texts.upsert.push(text);
        onSubmit({ texts, translations: trans });
      } else {
        console.info("Nothing changed, skipping!");
      }
    }
    return (
      <Formik
        ref={ref}
        initialValues={initialValues}
        validationSchema={TitleSchema}
        onSubmit={(values, actions) => handleTitleSave(values, actions)}
        enableReinitialize={true}
      >
        {({ values }) => (
          <Form>
            <Grid
              item
              container
              spacing={0}
              direction="column"
              alignItems="stretch"
              style={{ marginTop: "10px" }}
            >
              <Grid container item alignItems="flex-start">
                <Field
                  name={`isSwissGerman`}
                  Label={{ label: t("editor:swissGerman") }}
                  component={CheckboxWithLabel}
                />
                <Field
                  name={`isGerman`}
                  Label={{ label: t("editor:german") }}
                  component={CheckboxWithLabel}
                />
                <Field
                  name={`isNative`}
                  Label={{ label: t("editor:translatable") }}
                  component={CheckboxWithLabel}
                />

                {nativeLanguages && nativeLanguages.length ? (
                  <Field
                    name={`shouldInvalidateTranslations`}
                    Label={{ label: t("editor:shouldInvalidateTranslations") }}
                    component={CheckboxWithLabel}
                  />
                ) : null}
              </Grid>
              <Grid item>
                <Field
                  name={`swissGerman.text_field`}
                  label={t("editor:swissGerman")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                  disabled={!values.isSwissGerman}
                />
                <Field
                  name={`german.text_field`}
                  label={t("editor:german")}
                  component={TextField}
                  margin="normal"
                  fullWidth
                  disabled={!values.isGerman}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    );
  }
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    //
  }
}));

interface TitleComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor
 */
const TitleComponent = ({ data, ...otherProps }: TitleComponentProps) => {
  const classes = useStyles();
  const text = data.texts[0];

  const preview = (
    <Grid item container direction="row" className={classes.container}>
      <MultiTranslationText text={text} />
    </Grid>
  );
  return <BaseComponent preview={preview} data={data} {...otherProps} />;
};

export default TitleComponent;
