import * as React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";

import BaseComponent, {
  BaseComponentProps,
  BaseSettingsProps
} from "../BaseComponent";
import Text from "components/Text";

interface IDefaultSettingsFormFields {}

/**
 * Validation Schema definition of the input fields of this component
 * Note the conditional rules
 */
const DefaultSchema = Yup.object().shape({});

export interface DefaultSettingsProps extends BaseSettingsProps {}

/**
 * View for Settings widget
 */
export const DefaultSettings = React.forwardRef<any, DefaultSettingsProps>(
  (props, ref) => {
    const { onSubmit } = props;

    const initialValues: IDefaultSettingsFormFields = {};

    return (
      <Formik
        ref={ref}
        initialValues={initialValues}
        validationSchema={DefaultSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ values }) => (
          <Form>
            <Grid
              item
              container
              spacing={0}
              direction="column"
              alignItems="stretch"
              style={{ marginTop: "10px" }}
            ></Grid>
          </Form>
        )}
      </Formik>
    );
  }
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexGrow: 1
    // backgroundColor: "white"
  }
}));

export interface DefaultComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor
 */
const DefaultComponent = ({ data, ...otherProps }: DefaultComponentProps) => {
  const classes = useStyles();

  const preview = (
    <Box className={classes.container} bgcolor="text.primary" p={2} m={1}>
      <Grid xs={12} item container direction="row">
        <Text translate={false}> Here... </Text>
      </Grid>
    </Box>
  );

  return <BaseComponent preview={preview} data={data} {...otherProps} />;
};

export default DefaultComponent;
