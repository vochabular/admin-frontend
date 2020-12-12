import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Form, Formik, FormikActions as FormikHelpers } from "formik";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider, Button } from "@material-ui/core";

import { styles } from "styles";
import GeneralSection from "pages/Settings/SettingsSection/PersonalSection";
import LanguagesSection from "pages/Settings/SettingsSection/AdministrativeSection";
import NotificationSection from "pages/Settings/SettingsSection/NotificationSection";
import i18next from "i18n";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import { useAuth } from "contexts/AuthContext";

import {
  profile as TProfile,
  profileVariables,
  profile_profile,
} from "queries/__generated__/profile";
import {
  updateProfileVariables,
  updateProfile,
} from "queries/__generated__/updateProfile";
import { GET_DJANGO_PROFILE, UPDATE_DJANGO_PROFILE } from "queries/profile";

export const UserSetupSchema = Yup.object().shape({
  language: Yup.string().required(i18next.t("required")),
  firstname: Yup.string()
    .required(i18next.t("required"))
    .max(50, i18next.t("tooLong")),
  lastname: Yup.string()
    .required(i18next.t("required"))
    .max(50, i18next.t("tooLong")),
  currentRole: Yup.string().required(i18next.t("required")),
});

interface Props extends WithStyles<typeof styles> {}

const Settings: React.FunctionComponent<Props> = ({ classes }) => {
  const { user } = useAuth();
  const email = (user && user.email) || "";

  const { t, i18n } = useTranslation();
  const { data, loading, error } = useQuery<TProfile, profileVariables>(
    GET_DJANGO_PROFILE,
    {
      variables: {
        username: email,
      },
    }
  );
  const profile = data && data.profile;

  const [mutateProfile] = useMutation<updateProfile, updateProfileVariables>(
    UPDATE_DJANGO_PROFILE
  );

  // Here we would now update the backend settings...
  async function handleSave(
    values: profile_profile,
    actions: FormikHelpers<any> // FormikHelpers<updateProfileVariables>
  ) {
    const newSettings: any = { ...values };
    delete newSettings.id;
    delete newSettings.language;
    delete newSettings.translatorLanguages;

    i18n.changeLanguage((values.language && values.language.id) || "en");

    newSettings.language = values?.language?.id || null;
    newSettings.translatorLanguages = values?.translatorLanguages?.map(
      (t) => t.id
    );

    await mutateProfile({
      variables: { profile: { username: email, profileData: newSettings } },
    });
    actions.setSubmitting(false);
  }

  const initialProfile = profile && { ...profile };

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
            >
              {({ values, submitForm }) => (
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
            </Formik>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(Settings);
