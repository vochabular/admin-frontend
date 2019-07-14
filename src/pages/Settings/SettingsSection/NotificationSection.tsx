import React from "react";
import { useTranslation } from "react-i18next";

import {
  FormControl,
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox
} from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";

import { styles } from "styles";
import { profile_profile } from "queries/__generated__/profile";

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
            control={<Checkbox checked={values.eventNotifications} />}
          />
        </FormGroup>
      </FormControl>
    </Grid>
  );
}

export default withStyles(styles)(NotificationSection);
