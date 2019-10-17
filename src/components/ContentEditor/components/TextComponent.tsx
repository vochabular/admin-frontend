import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { TextField } from "formik-material-ui";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

import BaseComponent, {
  BaseComponentProps,
  BaseSettingsProps
} from "../BaseComponent";
import Text from "components/Text";
import i18next from "i18next";

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
    otherwise: Yup.string()
  }),
  german: Yup.object().when("isSwissGerman", {
    is: true,
    then: Yup.string().required(i18next.t("required")),
    otherwise: Yup.string()
  })
});

export interface TextSettingsProps extends BaseSettingsProps {}

/**
 * Setting widget's dynamic component view
 */
export const TextSettings = React.forwardRef<any, TextSettingsProps>(
  (props, ref) => {
    const { onSubmit } = props;
    const { t } = useTranslation();

    return (
      <Formik
        ref={ref}
        initialValues={"{ text: data.data }"}
        validationSchema={TextSchema}
        onSubmit={values => onSubmit(values)}
        render={({ submitForm, values, isSubmitting, status }) => (
          <Form>
            <Field
              type="string"
              name="text"
              label={t("editor:Text")}
              helperText={t("editor:TextHelper")}
              component={TextField}
              margin="normal"
              fullWidth
            />
          </Form>
        )}
      />
    );
  }
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    border: "dashed"
  }
}));

export interface TextComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor
 */
const TextComponent = ({ data, ...otherProps }: TextComponentProps) => {
  const classes = useStyles();
  const preview = (
    <Text translate={false} className={classes.container}>
      {data.data}
    </Text>
  );

  return <BaseComponent preview={preview} data={data} {...otherProps} />;
};

export default TextComponent;
