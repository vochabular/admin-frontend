import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles, WithStyles, Grid, Paper } from "@material-ui/core";

import { styles } from "src/styles";
import GeneralSection from "src/pages/Settings/SettingsSection/GeneralSection";
import LanguagesSection from "src/pages/Settings/SettingsSection/LanguagesSection";
import NotificationSection from "src/pages/Settings/SettingsSection/NotificationSection";
import { useQuery, useApolloClient, useMutation } from "react-apollo-hooks";
import { GET_SETTINGS, UPDATE_SETTINGS } from "src/queries/settings";
import { Formik, FormikActions, FormikBag, Form } from "formik";
import { UserSetupSchema } from "src/pages/Settings/Settings";

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
      return GeneralSection;
    case 1:
      return LanguagesSection;
    case 2:
      return NotificationSection;
    default:
      return GeneralSection;
  }
}

interface Props extends WithStyles<typeof styles> {}

function SetupWizard({ classes }: Props) {
  const { t } = useTranslation();
  const { data, error, loading } = useQuery(GET_SETTINGS);
  const updateSettings = useMutation(UPDATE_SETTINGS);

  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

  async function handleSubmit(values: any, actions: FormikActions<any>) {
    if (activeStep === steps.length - 1) {
      const updatedSettings = { ...values, hasCompletedSetup: true };
      updateSettings({ variables: { settings: updatedSettings } });
      // TODO: This then has to go to the server...
      localStorage.setItem("settings", JSON.stringify(updatedSettings));
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

  return (
    <Paper className={classes.card}>
      <Grid
        container
        spacing={24}
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <Typography component="h6" variant="h6" gutterBottom>
          {t("setupWizard:title")}
        </Typography>
        <Formik
          initialValues={data && data.settings}
          validationSchema={UserSetupSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          render={({ submitForm, values }) => (
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
                <ActiveStepContent values={values} />
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
