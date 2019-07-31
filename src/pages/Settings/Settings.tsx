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
import GeneralSection from "pages/Settings/SettingsSection/PersonalSection";
import LanguagesSection from "pages/Settings/SettingsSection/AdministrativeSection";
import NotificationSection from "pages/Settings/SettingsSection/NotificationSection";
import i18next from "i18n";
import { GET_PROFILE, UPDATE_PROFILE } from "queries/profile";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import { profile_profile, profile } from "queries/__generated__/profile";
import { Role } from "rbac-rules";
import { useAuth } from "contexts/AuthContext";

export const UserSetupSchema = Yup.object().shape({
  language: Yup.string().required(i18next.t("required")),
  firstname: Yup.string()
    .required(i18next.t("required"))
    .max(50, i18next.t("tooLong")),
  lastname: Yup.string()
    .required(i18next.t("required"))
    .max(50, i18next.t("tooLong")),
  currentRole: Yup.string().required(i18next.t("required"))
});

interface Props extends WithStyles<typeof styles> {}

const Settings: React.FunctionComponent<Props> = ({ classes }) => {
  const { user, changeCurrentRole } = useAuth();
  const username = user && user.email;

  const { t, i18n } = useTranslation();
  const { data, loading, error } = useQuery<profile>(GET_PROFILE, {
    variables: {
      username: username
    }
  });

  const [mutateProfile] = useMutation(UPDATE_PROFILE);

  // Here we would now update the backend settings...
  async function handleSave(
    values: profile_profile,
    actions: FormikActions<any>
  ) {
    const newSettings = { ...values };
    delete newSettings.id;

    // @ts-ignore
    const currentRole: Role = Role[newSettings.currentRole];
    changeCurrentRole(currentRole);
    i18n.changeLanguage(newSettings.language);
    // Note: we need to strip the typename, as otherwise the backend complains and apollo client unfortunately doesn't strip it. TODO(df): need to find a central place to strip typenames generally...
    const { __typename, ...profile } = newSettings;
    // @ts-ignore
    profile.translatorLanguages = profile.translatorLanguages.join(",");
    await mutateProfile({
      variables: { profile: { username, profileData: profile } }
    });
    actions.setSubmitting(false);
  }

  //TODO: Hack until backend has changed type...
  const initialProfile = data && data.profile && { ...data.profile };
  if (initialProfile) {
    // @ts-ignore
    initialProfile.language =
      (initialProfile.language && initialProfile.language.toLowerCase()) ||
      "de";
    // @ts-ignore
    initialProfile.translatorLanguages = initialProfile.translatorLanguages.split(
      ","
    );
  }

  return (
    <React.Fragment>
      <Typography variant="h3">{t("settings:title")}</Typography>

      <BusyOrErrorCard loading={loading} error={error} />
      {initialProfile && (
        <Card>
          <CardContent>
            <Formik
              initialValues={initialProfile}
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
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(Settings);
