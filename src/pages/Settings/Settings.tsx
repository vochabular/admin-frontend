import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useQuery, useMutation } from "react-apollo-hooks";
import { Form, Formik, FormikActions } from "formik";

import { withStyles, WithStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider, Button } from "@material-ui/core";

import { styles } from "styles";
import GeneralSection from "pages/Settings/SettingsSection/GeneralSection";
import LanguagesSection from "pages/Settings/SettingsSection/LanguagesSection";
import NotificationSection from "pages/Settings/SettingsSection/NotificationSection";
import i18next from "i18n";
import { GET_SETTINGS, UPDATE_SETTINGS } from "queries/settings";
import auth0Client from "auth/Auth";

export const UserSetupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(4, i18next.t("tooShort"))
    .max(50, i18next.t("tooLong"))
    .required(i18next.t("required")),
  currentRole: Yup.string().required(i18next.t("required"))
});

interface Props extends WithStyles<typeof styles> {}

const Settings: React.FunctionComponent<Props> = ({ classes }) => {
  const { t, i18n } = useTranslation();
  const { data } = useQuery(GET_SETTINGS);
  const updateSettings = useMutation(UPDATE_SETTINGS);

  // Here we would now update the backend settings...
  function handleSave(values: any, actions: FormikActions<any>) {
    const newSettings = { ...values };
    updateSettings({ variables: { settings: newSettings } });
    // TODO: This then has to go to the server...

    auth0Client.changeCurrentRole(newSettings.currentRole);
    i18n.changeLanguage(newSettings.language);
    localStorage.setItem("settings", JSON.stringify(newSettings));
    actions.setSubmitting(false);
  }

  return (
    <React.Fragment>
      <Typography variant="h3">{t("settings:title")}</Typography>
      <Card>
        <CardContent>
          <Formik
            initialValues={data && data.settings}
            validationSchema={UserSetupSchema}
            onSubmit={(values, actions) => handleSave(values, actions)}
            render={({ submitForm, values }) => (
              <Form>
                <React.Fragment>
                  <GeneralSection values={values} />
                  <Divider />
                  <LanguagesSection values={values} />
                  <Divider />
                  <NotificationSection values={values} />
                </React.Fragment>
                <Button
                  variant="contained"
                  color="primary"
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

export default withStyles(styles)(Settings);
