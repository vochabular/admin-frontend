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
import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "styles";
import { getProfile_profiles } from "queries/__generated__/getProfile";

interface Props extends WithStyles<typeof styles> {
  values: getProfile_profiles;
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
