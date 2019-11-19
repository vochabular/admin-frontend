import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, FormikHelpers } from "formik";
import { useMutation } from "@apollo/react-hooks";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";

import { styles } from "styles";
import PersonalSection from "pages/Settings/SettingsSection/PersonalSection";
import AdministrativeSection from "pages/Settings/SettingsSection/AdministrativeSection";
import NotificationSection from "pages/Settings/SettingsSection/NotificationSection";
import { UPDATE_PROFILE } from "queries/profile";
import { UserSetupSchema } from "pages/Settings/Settings";
import { profile_profile } from "queries/__generated__/profile";
import { useAuth } from "contexts/AuthContext";

function getSteps() {
  return [
    "setupWizard:chooseGeneralSettings",
    "setupWizard:chooseLanguages",
    "setupWizard:chooseNotifications"
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return PersonalSection;
    case 1:
      return AdministrativeSection;
    case 2:
      return NotificationSection;
    default:
      return PersonalSection;
  }
}

interface Props extends WithStyles<typeof styles> {
  profile: profile_profile;
}

function SetupWizard({ classes, profile }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [mutateProfile] = useMutation(UPDATE_PROFILE);

  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

  async function handleSubmit(
    values: profile_profile,
    actions: FormikHelpers<profile_profile>
  ) {
    if (activeStep === steps.length - 1) {
      const updatedProfile = {
        firstname: values.firstname,
        lastname: values.lastname,
        roles: user && user.allowedRoles.join(","),
        currentRole: user && user.allowedRoles[0], // TODO(df): need to set this in the AuthContext, based from the userprofile query on startup...
        language: values.language,
        eventNotifications: values.eventNotifications,
        translatorLanguages:
          // @ts-ignore
          values.translatorLanguages && values.translatorLanguages.join(","),
        setupCompleted: true
      };
      const payload = {
        profile: {
          username: user && user.email,
          profileData: updatedProfile
        }
      };
      await mutateProfile({
        variables: payload
      });
    } else {
      handleNext(actions.validateForm);
      actions.setSubmitting(false);
    }
  }

  // TODO(df): Need to validate the form on each step!
  function handleNext(validateForm: CallableFunction) {
    if (activeStep === steps.length - 1) {
      return null;
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  // Note here: We are getting a "dynamic" component
  const ActiveStepContent: React.ElementType = getStepContent(activeStep);

  //TODO: Hack until backend has changed type...
  const initialProfile = { ...profile };
  // @ts-ignore
  initialProfile.translatorLanguages =
    (profile &&
      profile.translatorLanguages &&
      profile.translatorLanguages.split(",")) ||
    "";
  // @ts-ignore
  initialProfile.language = (profile && profile.language.toLowerCase()) || "de";
  initialProfile.currentRole =
    (profile && profile.currentRole) ||
    (user && user.currentRole) || // TODO(df): Need to get the current role of the user...
    "";
  initialProfile.firstname = "";
  initialProfile.lastname = "";

  return (
    <Paper className={classes.card}>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <Typography component="h6" variant="h6" gutterBottom>
          {t("setupWizard:title")}
        </Typography>
        <Formik
          initialValues={initialProfile}
          validationSchema={UserSetupSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {({ submitForm, values, setFieldValue, validateForm }) => (
            <Form>
              <Grid item xs={12}>
                <Stepper activeStep={activeStep}>
                  {steps.map(label => {
                    return (
                      <Step key={label}>
                        <StepLabel>{t(label)}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Grid>
              <Grid item xs={12}>
                <ActiveStepContent
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item xs={12}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  {t("back")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    activeStep === steps.length - 1
                      ? submitForm
                      : () => handleNext(validateForm)
                  }
                >
                  {activeStep === steps.length - 1 ? t("finish") : t("next")}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(SetupWizard);
