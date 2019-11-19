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
} from "../../BaseComponent";
import Text from "components/Text";
import i18next from "i18next";

/**
 * Validation Schema definition of the input fields of this component
 */
const BubbleItemSchema = Yup.object().shape({
  BubbleItem: Yup.string().required(i18next.t("required"))
});

export interface BubbleItemSettingsProps extends BaseSettingsProps {}

/**
 * Setting widget's dynamic component view
 */
export const BubbleItemSettings = React.forwardRef<
  any,
  BubbleItemSettingsProps
>((props, ref) => {
  const { onSubmit } = props;
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{}}
      validationSchema={BubbleItemSchema}
      onSubmit={values => onSubmit({})}
    >
      {props => (
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
    </Formik>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    border: "dashed",
    borderRadius: 2
  }
}));

export interface BubbleItemComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor
 */
const BubbleItemComponent = ({
  data,
  ...otherProps
}: BubbleItemComponentProps) => {
  const classes = useStyles();
  const preview = <div className={classes.container}></div>;

  return <BaseComponent preview={preview} data={data} {...otherProps} />;
};

export default BubbleItemComponent;
