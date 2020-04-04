import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { useQuery } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import BaseComponent, {
  BaseComponentProps,
  BaseSettingsProps,
} from "../BaseComponent";
import Text from "components/Text";
import { LanguageContext } from "theme";
import { getLocalEditorLanguage } from "queries/__generated__/getLocalEditorLanguage";
import { GET_LOCAL_EDITOR_LANGUAGE } from "queries/component";
import {
  ITranslation,
  ICrudTextOperations,
  ICrudTranslationOperations,
  IText,
} from "../Settings";
import Diff from "helper/Diff";
import { cloneDeep } from "lodash-es";
import ContextText from "components/ContextText";
import LanguageBadges from "components/LanguageBadges";
import { transformTranslations } from "helper/translations";
import i18next from "i18next";

/**
 * Type for form field of the settings widget of the text component
 */
interface ITextSettingsFormFields {
  isSwissGerman: boolean;
  isGerman: boolean;
  isNative: boolean;
  placeholder: string;
  swissGerman: ITranslation;
  german: ITranslation;
  shouldInvalidateTranslations?: boolean;
  [key: string]: any;
}

/**
 * Validation Schema definition of the input fields of this component
 */
const TextSchema = Yup.object().shape({
  isSwissGerman: Yup.boolean(),
  isGerman: Yup.boolean(),
  isNative: Yup.boolean(),
  swissGerman: Yup.object().when("isSwissGerman", {
    is: true,
    then: Yup.string().required(i18next.t("required")),
    otherwise: Yup.string(),
  }),
  german: Yup.object().when("isSwissGerman", {
    is: true,
    then: Yup.string().required(i18next.t("required")),
    otherwise: Yup.string(),
  }),
  placeholder: Yup.string(),
});

interface TextSettingsProps extends BaseSettingsProps {}

/**
 * Setting widget's dynamic component view
 */

export const TextSettings = React.forwardRef<any, TextSettingsProps>(
  (props, ref) => {
    const { data, onSubmit } = props;
    const { t } = useTranslation("chapterEditor");

    const { data: editorLanguageData } = useQuery<getLocalEditorLanguage>(
      GET_LOCAL_EDITOR_LANGUAGE
    );
    const editorLanguage =
      editorLanguageData && editorLanguageData.contentEditorLanguage;

    const text = (data && data.texts[0]) || {};
    const { german, swissGerman, nativeLanguages } = transformTranslations(
      text.translations,
      ((editorLanguage as unknown) as string) || "en"
    );

    const initialValues = {
      isGerman: !!german,
      isSwissGerman: !!swissGerman,
      isNative: text.translatable || false,
      placeholder: text.placeholder || swissGerman?.text_field || "",
      german: german || {
        text_field: "",
        valid: false,
        languageCode: "de",
      },
      swissGerman: swissGerman || {
        text_field: "",
        valid: false,
        languageCode: "ch",
      },
      shouldInvalidateTranslations: false,
    };

    function handleTextSave(values: ITextSettingsFormFields, actions: any) {
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
        text.placeholder = values.placeholder;

        // IF flag is active AND value or flag has changed, then we need to upsert the swissGerman translation
        if (
          values.isSwissGerman &&
          result.updated.find(
            (r) => r.path[0] === "swissGerman" || r.path[0] === "isSwissGerman"
          )
        ) {
          text.translations.push(values.swissGerman);
        }
        // Same for german...
        if (
          values.isGerman &&
          result.updated.find(
            (r) => r.path[0] === "german" || r.path[0] === "isGerman"
          )
        ) {
          text.translations.push(values.german);
          // Also, if the placeholder is empty, we want to fill it with the german value!
          if (!text.placeholder && !values.placeholder) {
            text.placeholder = values.german.text_field;
          }
        }

        // Additionally, also the case of disabled flags need to be covered
        result.updated.forEach((i) => {
          switch (i.path[0]) {
            // If the flag value has changed to false, then add this translation to the delete object
            case "isSwissGerman":
            case "isGerman":
              if (!i.val) {
                const originalTranslation = data.texts[0].translations.find(
                  (t) =>
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
        validationSchema={TextSchema}
        onSubmit={handleTextSave}
      >
        {(props) => (
          <Form>
            <Grid container item alignItems="flex-start">
              <Field
                name={`isSwissGerman`}
                Label={{ label: t("swissGerman") }}
                component={CheckboxWithLabel}
              />
              <Field
                name={`isGerman`}
                Label={{ label: t("german") }}
                component={CheckboxWithLabel}
              />
              <Field
                name={`isNative`}
                Label={{ label: t("translatable") }}
                component={CheckboxWithLabel}
              />
              {nativeLanguages && nativeLanguages.length ? (
                <Field
                  name={`shouldInvalidateTranslations`}
                  Label={{
                    label: t("shouldInvalidateTranslations"),
                  }}
                  component={CheckboxWithLabel}
                />
              ) : null}
            </Grid>
            <Field
              type="string"
              name="placeholder"
              label={t("placeholder")}
              component={TextField}
              fullWidth
              multiline
              rowsMax="4"
            />
            {props.values.isSwissGerman && (
              <Field
                type="string"
                name="swissGerman.text_field"
                label={t("swissGerman")}
                component={TextField}
                fullWidth
                multiline
                rowsMax="4"
              />
            )}
            {props.values.isGerman && (
              <Field
                type="string"
                name="german.text_field"
                label={t("german")}
                component={TextField}
                fullWidth
                multiline
                rowsMax="4"
              />
            )}
          </Form>
        )}
      </Formik>
    );
  }
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  compactContainer: {
    border: "groove",
    borderRadius: 0.5,
    // padding: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: "white",
  },
}));

interface PlaceholderOrContextTextProps {
  text: any;
  isColorContext?: boolean;
}
const PlaceholderOrContextText = ({
  text,
  isColorContext,
}: PlaceholderOrContextTextProps) => {
  if (text?.placeholder) {
    return <Text translate={false}>{text.placeholder}</Text>;
  }
  return (
    <ContextText
      translations={text?.translations || []}
      wantedLanguage="ch"
      isColorContext={isColorContext}
    />
  );
};

interface TextComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor:
 */
const TextComponent = ({
  data,
  renderCompact,
  ...otherProps
}: TextComponentProps) => {
  const classes = useStyles();
  const text = data && data.texts && data.texts[0];
  const preview = (
    <Grid item container direction="row" className={classes.container}>
      <LanguageBadges text={text} />
    </Grid>
  );
  const body = <PlaceholderOrContextText text={text} />;
  if (renderCompact) {
    const compactBody = (
      <div className={classes.compactContainer}>
        <PlaceholderOrContextText text={text} isColorContext />
      </div>
    );
    return (
      <BaseComponent
        data={data}
        body={compactBody}
        renderCompact
        {...otherProps}
      />
    );
  }

  return (
    <BaseComponent preview={preview} body={body} data={data} {...otherProps} />
  );
};

export default TextComponent;
