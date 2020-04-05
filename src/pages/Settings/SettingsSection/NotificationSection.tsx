import React from "react";
import { useTranslation } from "react-i18next";

import {
  FormControl,
  Grid,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "styles";
import { profile_profile } from "queries/__generated__/profile";
import { Field } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

interface Props extends WithStyles<typeof styles> {
  values: profile_profile;
}

function NotificationSection({ classes, values }: Props) {
  const { t } = useTranslation();

  return (
    <Grid>
      <FormControl>
        <FormLabel>{t("setupWizard:eventNotificationsTitle")}</FormLabel>
        <FormGroup>
          <FormControlLabel
            label={t("setupWizard:receiveEventNotifications")}
            control={
              <Field
                type="checkbox"
                name="eventNotifications"
                label={t("setupWizard:receiveEventNotifications")}
                component={CheckboxWithLabel}
                margin="normal"
                value={values.eventNotifications}
              />
            }
          />
        </FormGroup>
      </FormControl>
    </Grid>
  );
}

export default withStyles(styles)(NotificationSection);
