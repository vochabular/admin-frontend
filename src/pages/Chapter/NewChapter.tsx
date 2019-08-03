import * as React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Formik, Form, Field, FormikActions } from "formik";
import { TextField, Select } from "formik-material-ui";
import { useMutation, useQuery } from "react-apollo-hooks";

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
import { convertGlobalToDbId } from "helpers";
import { GET_LANGUAGES } from "../../queries/languages";
import { getLanguages } from "queries/__generated__/getLanguages";
import { subscribeChapterById_chapter_parentChapter } from "queries/__generated__/subscribeChapterById";

export const ChapterSchema = Yup.object().shape({
  number: Yup.number()
    .min(1, i18next.t("tooLow"))
    .max(20, i18next.t("tooHigh"))
    .required(i18next.t("required")),
  description: Yup.string().max(200, i18next.t("tooLong")),
  titleDE: Yup.string().max(50, i18next.t("tooLong")),
  titleCH: Yup.string().max(50, i18next.t("tooLong")),
  languages: Yup.string()
    .min(1, i18next.t("tooLow"))
    .max(50, i18next.t("tooHigh"))
    .required(i18next.t("required"))
});

interface Props extends WithStyles<typeof styles> {
  parentChapter?: subscribeChapterById_chapter_parentChapter;
}

const NewChapter = ({ classes, parentChapter }: Props) => {
  const { t } = useTranslation();

  const { data } = useQuery<getLanguages>(GET_LANGUAGES);

  const isSubChapter = !!parentChapter;

  // TODO: Unfortunately, react-apollo-hooks doesn't support yet the error, loading object in mutations (unlike with query...)
  const [upsertChapter, { loading }] = useMutation(UPSERT_CHAPTER);

  async function handleSave(values: any, actions: FormikActions<any>) {
    // TODO: This verbose stuff won't be necessary anymore as soon useMutation also returns a error/loading object.
    try {
      values.fkBelongsToId = isSubChapter ? parentChapter!.id : null;
      values.languages = values.languages.join(",");
      await upsertChapter({
        variables: {
          input: { chapterData: { ...values } }
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
              ` ${parentChapter!.number}: ${parentChapter!.titleDE} / ${
                parentChapter!.titleCH
              }`
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
            render={({ submitForm, values, isSubmitting, status }) => (
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
                    {data && data.languages ? (
                      data.languages.map(l =>
                        l && l.code && l.name ? (
                          <MenuItem key={l.code} value={l.code}>
                            {l.name}
                          </MenuItem>
                        ) : (
                          <MenuItem />
                        )
                      )
                    ) : (
                      <MenuItem />
                    )}
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
          />
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(NewChapter);
