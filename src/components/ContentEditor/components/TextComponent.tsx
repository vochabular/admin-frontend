import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { useQuery } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import BaseComponent, {
  BaseComponentProps,
  BaseSettingsProps
} from "../BaseComponent";
import Text from "components/Text";
import MultiTranslationText from "components/MultiTranslationText";
import { LanguageContext } from "theme";
import { getSelectedComponent_component_texts_translations } from "queries/__generated__/getSelectedComponent";
import { getLocalEditorLanguage } from "queries/__generated__/getLocalEditorLanguage";
import { GET_LOCAL_EDITOR_LANGUAGE } from "queries/component";
import {
  ITranslation,
  ICrudTextOperations,
  ICrudTranslationOperations,
  IText
} from "../Settings";
import Diff from "helper/Diff";
import { cloneDeep } from "lodash-es";

/**
 * Transforms an array of translations into an object with SwissGerman, German and all native langauges in an array
 * @param translations
 */
export function transformTranslations(
  translations: getSelectedComponent_component_texts_translations[],
  currentNativeLanguage?: string
) {
  const swissGerman =
    translations &&
    translations.find(t => t.language.id === LanguageContext.ch);
  const german =
    translations &&
    translations.find(t => t.language.id === LanguageContext.de);
  const currentNativeTranslation =
    currentNativeLanguage &&
    translations &&
    translations.find(t => t.language.id === currentNativeLanguage);
  const nativeLanguages =
    (translations &&
      translations.filter(
        t =>
          !([LanguageContext.ch, LanguageContext.de] as string[]).includes(
            t.language.id
          )
      )) ||
    [];
  return { swissGerman, german, nativeLanguages, currentNativeTranslation };
}

/**
 * Type for form field of the settings widget of the text component
 */
interface ITextSettingsFormFields {
  isSwissGerman: boolean;
  isGerman: boolean;
  isNative: boolean;
  swissGerman: ITranslation;
  german: ITranslation;
  native: ITranslation;
  shouldInvalidateTranslations?: boolean;
  [key: string]: any;
}

/**
 * Validation Schema definition of the input fields of this component
 */
const TextSchema = Yup.object().shape({
  isNative: Yup.boolean()
});

interface TextSettingsProps extends BaseSettingsProps {}

/**
 * Setting widget's dynamic component view
 */

export const TextSettings = React.forwardRef<any, TextSettingsProps>(
  (props, ref) => {
    const { data, onSubmit } = props;
    const { t } = useTranslation();

    const { data: editorLanguageData } = useQuery<getLocalEditorLanguage>(
      GET_LOCAL_EDITOR_LANGUAGE
    );
    const editorLanguage =
      editorLanguageData && editorLanguageData.contentEditorLanguage;

    const text = (data && data.texts[0]) || {};
    const {
      german,
      swissGerman,
      nativeLanguages,
      currentNativeTranslation
    } = transformTranslations(
      text.translations,
      ((editorLanguage as unknown) as string) || "en"
    );

    const initialValues = {
      isGerman: !!german,
      isSwissGerman: !!swissGerman,
      isNative: text.translatable || false,
      german: german || {
        text_field: "",
        valid: false,
        languageCode: "de"
      },
      swissGerman: swissGerman || {
        text_field: "",
        valid: false,
        languageCode: "ch"
      },
      native: currentNativeTranslation || {
        text_field: "",
        valid: false,
        languageCode: editorLanguage
      },
      shouldInvalidateTranslations: false
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
        if (
          values.isNative &&
          result.updated.find(
            r => r.path[0] === editorLanguage || r.path[0] === "isNative"
          )
        ) {
          text.translations.push(values.native);
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
              console.log(result);
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
        {props => (
          <Form>
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
            {props.values.isSwissGerman && (
              <Field
                type="string"
                name="swissGerman.text_field"
                label={t("editor:swissGerman")}
                component={TextField}
                fullWidth
              />
            )}
            {props.values.isGerman && (
              <Field
                type="string"
                name="german.text_field"
                label={t("editor:german")}
                component={TextField}
                fullWidth
              />
            )}
            {props.values.isNative && (
              <Field
                type="string"
                name="native.text_field"
                label={editorLanguage}
                component={TextField}
                fullWidth
              />
            )}
          </Form>
        )}
      </Formik>
    );
  }
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    border: "dashed"
  }
}));

interface TextComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor:
 */
const TextComponent = ({ data, ...otherProps }: TextComponentProps) => {
  const text = data && data.texts && data.texts[0];
  const preview = (
    <Grid item container direction="row">
      <MultiTranslationText text={text} />
    </Grid>
  );
  const body = <Text>Hello text!</Text>;

  return (
    <BaseComponent preview={preview} body={body} data={data} {...otherProps} />
  );
};

export default TextComponent;
