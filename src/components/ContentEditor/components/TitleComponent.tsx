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
} from "../BaseComponent";
import Text from "components/Text";
import i18next from "i18next";
import { Grid, MenuItem } from "@material-ui/core";
import { InitialRelationDefinitionType } from "../ContentEditor";

/**
 *  A configuration object defining how the component's initial relations to text,  for the component --> text | media | ...
 */
export const TitleInitialRelations: InitialRelationDefinitionType = {
  numberOfTexts: 1
};

/**
 * Validation Schema definition of the input fields of this component
 * TODO(df): How do we do "dynamic" fields validation?
 */
const TitleSchema = Yup.object().shape({
  // title: Yup.string().required(i18next.t("required"))
});

export interface TitleSettingsProps extends BaseSettingsProps {}

/**
 * Setting widget's dynamic component view
 */
export const TitleSettings = React.forwardRef<any, TitleSettingsProps>(
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
        validationSchema={TitleSchema}
        onSubmit={(values, actions) => onSubmit(JSON.stringify(values))}
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
                          name={`translations[${idx}].textField`}
                          label={t("editor:Title")}
                          helperText={t("editor:TitleHelper")}
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

export interface TitleComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor
 */
const TitleComponent = ({ data, ...otherProps }: TitleComponentProps) => {
  const classes = useStyles();

  const preview = <Text translate={false}>{data.data}</Text>;

  return <BaseComponent preview={preview} data={data} {...otherProps} />;
};

export default TitleComponent;
