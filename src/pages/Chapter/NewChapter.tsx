import * as React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Formik, Form, Field, FormikActions as FormikHelpers } from "formik";
import { TextField, Select } from "formik-material-ui";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText
} from "@material-ui/core";

import { styles } from "styles";
import { UPSERT_CHAPTER } from "queries/chapters";
import i18next from "i18n";
import history from "myHistory";
import ErrorMessage from "components/ErrorMessage";
import { GET_LANGUAGES } from "../../queries/languages";
import { getLanguages } from "queries/__generated__/getLanguages";
import { subscribeChapterById_chapter_parentChapter } from "queries/__generated__/subscribeChapterById";
import { getChapters_chapters_languages } from "queries/__generated__/getChapters";
import {
  createChapter_insert_api_chapter,
  createChapter,
  createChapterVariables
} from "queries/__generated__/createChapter";

export const ChapterSchema = Yup.object().shape({
  number: Yup.number()
    .min(1, i18next.t("tooLow"))
    .max(20, i18next.t("tooHigh"))
    .required(i18next.t("required")),
  description: Yup.string().max(200, i18next.t("tooLong")),
  titleDE: Yup.string().max(50, i18next.t("tooLong")),
  titleCH: Yup.string().max(50, i18next.t("tooLong")),
  languages: Yup.array()
    .required()
    .min(1, i18next.t("min"))
    .required(i18next.t("required"))
});

interface Props extends WithStyles<typeof styles> {
  parentChapter?: subscribeChapterById_chapter_parentChapter;
}

const NewChapter = ({ classes, parentChapter }: Props) => {
  const { t } = useTranslation();
  const { data } = useQuery<getLanguages>(GET_LANGUAGES);
  const [upsertChapter, { loading }] = useMutation<
    createChapter,
    createChapterVariables
  >(UPSERT_CHAPTER);
  const isSubChapter = !!parentChapter;

  async function handleSave(values: any, actions: FormikHelpers<any>) {
    // TODO: This verbose stuff won't be necessary anymore as soon useMutation also returns a error/loading object.
    try {
      const input = { ...values };
      console.log(values);
      input.fk_belongs_to_id = isSubChapter ? parentChapter!.id : null;
      input.languages = {};
      await upsertChapter({
        variables: {
          input
        }
      });
      isSubChapter
        ? history.push(`/chapters/${parentChapter!.id}`)
        : history.push("/chapters");
    } catch (e) {
      actions.setSubmitting(false);
      actions.setStatus({ response: `${t("serverError")}: ${e.message}` });
    }
  }

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Typography variant="h3">
          {isSubChapter
            ? t("chapter:newSubChapterTitle") +
              ` ${parentChapter!.number}: ${parentChapter!} / ${parentChapter!}`
            : t("chapter:newChapterTitle")}
        </Typography>
        <CardContent>
          <Formik
            initialValues={{
              titleDE: "",
              titleCH: "",
              number: 0, // TODO set to next number
              description: "",
              languages: data && data.languages ? data.languages : []
            }}
            validationSchema={ChapterSchema}
            onSubmit={(values, actions) => handleSave(values, actions)}
          >
            {({ submitForm, values, isSubmitting, status }) => (
              <Form>
                <Field
                  type="number"
                  name="number"
                  label={t(
                    isSubChapter
                      ? "chapter:subChapterNumber"
                      : "chapter:chapterNumber"
                  )}
                  helperText={t(
                    isSubChapter
                      ? "chapter:subChapterNumberHelper"
                      : "chapter:chapterNumberHelper"
                  )}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="text"
                  name="titleDE"
                  label={t("chapter:newChapterTitleDE")}
                  helperText={t(
                    isSubChapter
                      ? "chapter:newSubChapterTitleDEHelper"
                      : "chapter:newChapterTitleDEHelper"
                  )}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="text"
                  name="titleCH"
                  label={t("chapter:newChapterTitleCH")}
                  helperText={t(
                    isSubChapter
                      ? "chapter:newSubChapterTitleCHHelper"
                      : "chapter:newChapterTitleCHHelper"
                  )}
                  component={TextField}
                  margin="normal"
                  fullWidth
                />
                <Field
                  type="text"
                  name="description"
                  label={t("chapter:newChapterDescription")}
                  helperText={t(
                    isSubChapter
                      ? "chapter:newSubChapterDescriptionHelper"
                      : "chapter:newChapterDescriptionHelper"
                  )}
                  component={TextField}
                  margin="normal"
                  fullWidth
                  multiline
                  rows="6"
                />

                <FormControl margin="normal" fullWidth>
                  <InputLabel shrink={true} htmlFor="languages">
                    {t("chapter:newChapterLanguage")}
                  </InputLabel>
                  <Field
                    type="text"
                    name="languages"
                    component={Select}
                    multiple={true}
                    inputProps={{ name: "languages", id: "languages" }}
                  >
                    {data && data.languages
                      ? data.languages.map(l =>
                          l && l.id && l.name ? (
                            <MenuItem key={l.id} value={l.id}>
                              {l.name}
                            </MenuItem>
                          ) : null
                        )
                      : null}
                  </Field>
                  <FormHelperText>
                    {t("chapter:newChapterLanguageHelper")}
                  </FormHelperText>
                </FormControl>

                {status && status.response && (
                  <ErrorMessage error={status.response} />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || loading}
                  onClick={submitForm}
                >
                  {t("save")}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(NewChapter);
