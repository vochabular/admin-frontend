import * as React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { TextField, Select } from "formik-material-ui";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

import BaseComponent, {
  BaseComponentProps,
  BaseSettingsProps
} from "../../BaseComponent";
import Text from "components/Text";
import i18next from "i18next";
import { Grid, MenuItem } from "@material-ui/core";

/**
 * Validation Schema definition of the input fields of this component
 * TODO(df): How do we do "dynamic" fields validation?
 */
const DialogSchema = Yup.object().shape({
  // Dialog: Yup.string().required(i18next.t("required"))
});

export interface DialogSettingsProps extends BaseSettingsProps {}

/**
 * Setting widget's dynamic component view
 */
export const DialogSettings = React.forwardRef<any, DialogSettingsProps>(
  (props, ref) => {
    const { data, onSubmit } = props;

    const [translations, setTranslations] = React.useState(
      (data.texts[0] && data.texts[0].translations) || []
    );
    const { t } = useTranslation();

    return (
      <Formik
        ref={ref}
        initialValues={{ translations }}
        validationSchema={DialogSchema}
        onSubmit={(values, actions) => onSubmit({})}
        render={({ submitForm, values, isSubmitting, status }) => (
          <Form>
            <FieldArray
              name="translations"
              render={arrayHelpers => (
                <>
                  {translations.map((trans, idx) => (
                    <Grid
                      item
                      container
                      spacing={2}
                      key={trans.language.code}
                      alignItems="stretch"
                      //justify="center"
                    >
                      <Grid item>
                        <Field
                          name={`translations[${idx}].language.code`}
                          label={t("editor:Language")}
                          component={Select}
                          disabled={true}
                        >
                          <MenuItem value="de">Deutsch</MenuItem>
                          <MenuItem value="ch">Schweizerdeutsch</MenuItem>
                          {/* TODO(df): Does that need to come dynamically?*/}
                          <MenuItem value="en">English</MenuItem>
                        </Field>
                      </Grid>
                      <Grid item>
                        <Field
                          name={`translations[${idx}].text_field`}
                          label={t("editor:Dialog")}
                          helperText={t("editor:DialogHelper")}
                          component={TextField}
                          margin="normal"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  ))}
                </>
              )}
            />
          </Form>
        )}
      />
    );
  }
);

const useStyles = makeStyles((theme: Theme) => ({}));

export interface DialogComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor
 */
const DialogComponent = ({ data, ...otherProps }: DialogComponentProps) => {
  const classes = useStyles();

  const preview = <Text translate={false}>{data.data}</Text>;

  return <BaseComponent preview={preview} data={data} {...otherProps} />;
};

export default DialogComponent;
