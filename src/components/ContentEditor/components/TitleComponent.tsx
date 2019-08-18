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
const TitleSchema = Yup.object().shape({
  title: Yup.string().required(i18next.t("required"))
});

export interface TitleSettingsProps extends BaseSettingsProps {}

/**
 * Setting widget's dynamic component view
 */
export const TitleSettings = React.forwardRef<any, TitleSettingsProps>(
  (props, ref) => {
    const { data, onSubmit } = props;
    const { t } = useTranslation();

    return (
      <Formik
        ref={ref}
        initialValues={{ title: data }}
        validationSchema={TitleSchema}
        onSubmit={onSubmit}
        render={({ submitForm, values, isSubmitting, status }) => (
          <Form>
            <Field
              type="string"
              name="title"
              label={t("editor:Title")}
              helperText={t("editor:TitleHelper")}
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
