import * as React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import {
  Formik,
  Form,
  Field,
  FormikActions as FormikHelpers,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import { TextField, Select, CheckboxWithLabel } from "formik-material-ui";
import { useMutation, useQuery } from "@apollo/react-hooks";

import {
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

import { UPSERT_CHAPTER } from "queries/chapters";
import i18next from "i18n";
import history from "myHistory";
import ErrorMessage from "components/ErrorMessage";
import ActionButton from "components/ActionButton";
import { GET_LANGUAGES } from "../../queries/languages";
import { getLanguages } from "queries/__generated__/getLanguages";
import {
  subscribeChapterById_chapter_parentChapter,
  subscribeChapterById_chapter,
} from "queries/__generated__/subscribeChapterById";
import {
  api_chapter_insert_input,
  api_chaptertitle_constraint,
  api_chaptertitle_update_column,
} from "__generated__/globalTypes";
import {
  upsertChapter as TupsertChapter,
  upsertChapterVariables as TupsertChapterVariables,
} from "queries/__generated__/upsertChapter";
import Diff from "helper/Diff";

interface IChapterFormFields {
  number: number;
  description: string;
  languages: string[];
}

export const ChapterSchema = Yup.object().shape({
  number: Yup.number()
    .min(1, i18next.t("tooLow"))
    .max(20, i18next.t("tooHigh"))
    .required(i18next.t("required")),
  description: Yup.string().max(200, i18next.t("tooLong")),
  languages: Yup.array()
    .required()
    .min(1, i18next.t("At least one language required!"))
    .required(i18next.t("At least one language required!")),
});

interface ChapterFormProps {
  chapterData?: subscribeChapterById_chapter;
  parentChapter?: subscribeChapterById_chapter_parentChapter;
}

export function ChapterForm({ chapterData, parentChapter }: ChapterFormProps) {
  const {
    number = 0,
    description = "",
    languages = [],
    disable_children = true,
  } = chapterData || {};

  const { t } = useTranslation("chapter");
  const { data, error, loading } = useQuery<getLanguages>(GET_LANGUAGES);

  const allLanguages = data?.languages || [];

  const [
    upsertChapter,
    { loading: upsertLoading, error: upsertError },
  ] = useMutation<TupsertChapter, TupsertChapterVariables>(UPSERT_CHAPTER);
  const isSubChapter = !!parentChapter;

  const initialValues = {
    number,
    description,
    languages: languages.map((l) => l.language.id),
    disable_children,
  };

  async function handleSave(
    values: IChapterFormFields,
    actions: FormikHelpers<any>
  ) {
    const input: api_chapter_insert_input = { ...values, languages: null };
    if (parentChapter) {
      input.fk_belongs_to_id = (parentChapter && parentChapter.id) || null;
    }
    if (chapterData) {
      input.id = chapterData.id;
    }
    const result = new Diff(initialValues, values);
    input.languages = {
      on_conflict: {
        constraint: api_chaptertitle_constraint.api_chaptertitle_pkey,
        update_columns: [api_chaptertitle_update_column.title],
      },
      data: values.languages.map((key: string) => ({
        id: languages.find((l) => l.language.id === key)?.id,
        title: "",
        language_id: key,
      })),
    };
    await upsertChapter({
      variables: {
        input,
        deleteTitleIds:
          result.deleted
            .filter((r) => r.path[0] === "languages")[0]
            ?.vals.map((v) => languages.find((l) => l.language.id === v)?.id) ||
          [],
      },
    });
    isSubChapter
      ? history.push(`/chapters/${parentChapter!.id}`)
      : history.push("/chapters");
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ChapterSchema}
      onSubmit={(values, actions) => handleSave(values, actions)}
    >
      {({ submitForm, values, isSubmitting, status, errors }) => (
        <Form>
          <Field
            type="number"
            name="number"
            label={t(isSubChapter ? "subChapterNumber" : "chapterNumber")}
            helperText={t(
              isSubChapter ? "subChapterNumberHelper" : "chapterNumberHelper"
            )}
            component={TextField}
            margin="normal"
            fullWidth
          />
          <Field
            type="text"
            name="description"
            label={t("newChapterDescription")}
            helperText={t(
              isSubChapter
                ? "newSubChapterDescriptionHelper"
                : "newChapterDescriptionHelper"
            )}
            component={TextField}
            margin="normal"
            fullWidth
          />

          <FormControl margin="normal" fullWidth>
            <InputLabel shrink={true} htmlFor="languages">
              {t("newChapterLanguage")}
            </InputLabel>
            <Field
              type="text"
              name="languages"
              component={Select}
              multiple={true}
              disabled={loading}
            >
              {allLanguages.map((l) => (
                <MenuItem key={l.id} value={l.id}>
                  {l.name}
                </MenuItem>
              ))}
            </Field>
            <FormHelperText>{t("newChapterLanguageHelper")}</FormHelperText>
            <FormikErrorMessage name="languages" />
          </FormControl>
          {!isSubChapter ? (
            <Field
              name="disable_children"
              Label={{ label: t("disableChildren") }}
              component={CheckboxWithLabel}
              margin="normal"
            />
          ) : null}

          {status && status.response && (
            <ErrorMessage error={status.response} />
          )}
          <ErrorMessage error={upsertError || error} />
          <ActionButton
            variant="contained"
            color="primary"
            loading={isSubmitting || upsertLoading}
            onClick={submitForm}
          >
            {t("save")}
          </ActionButton>
        </Form>
      )}
    </Formik>
  );
}
