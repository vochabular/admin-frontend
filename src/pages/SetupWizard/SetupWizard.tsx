import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, FormikActions, Form } from "formik";
import { useMutation } from "react-apollo-hooks";

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
import auth0Client from "auth/Auth";
import i18n from "i18n";
import { profile_profile } from "queries/__generated__/profile";

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

const defaultProfile = {
  language: i18n.language,
  username: "",
  currentRole: "",
  translatorLanguages: ""
};

interface Props extends WithStyles<typeof styles> {
  profile: profile_profile;
}

function SetupWizard({ classes, profile }: Props) {
  const { t } = useTranslation();

  const currentUserEmail =
    auth0Client.userProfile && auth0Client.userProfile.name;

  const updateProfile = useMutation(UPDATE_PROFILE);

  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

  async function handleSubmit(values: any, actions: FormikActions<any>) {
    if (activeStep === steps.length - 1) {
      const updatedProfile = { ...values, hasCompletedSetup: true };
      updateProfile({ variables: { input: updatedProfile } });
    } else {
      handleNext();
      actions.setSubmitting(false);
    }
  }

  function handleNext() {
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

  console.log(profile);

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
          initialValues={profile}
          validationSchema={UserSetupSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          render={({ submitForm, values, setFieldValue }) => (
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
                    activeStep === steps.length - 1 ? submitForm : submitForm
                  }
                >
                  {activeStep === steps.length - 1 ? t("finish") : t("next")}
                </Button>
              </Grid>
            </Form>
          )}
        />
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(SetupWizard);
