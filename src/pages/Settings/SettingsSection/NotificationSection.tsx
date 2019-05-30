import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "react-apollo-hooks";

import {
  FormControl,
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox
} from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";

import { styles } from "src/styles";
import { GET_SETTINGS, UPDATE_SETTINGS } from "src/queries/settings";

interface Props extends WithStyles<typeof styles> {
  values: any;
}

function GeneralSection({ classes }: Props) {
  const { t, i18n } = useTranslation();
  const { data, error, loading } = useQuery(GET_SETTINGS);
  const updateSettings = useMutation(UPDATE_SETTINGS);

  const handleCheckboxChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateSettings({ variables: { [name]: event.target.value } });
  };

  return (
    <Grid>
      <FormControl>
        <FormLabel>{t("setupWizard:eventNotificationsTitle")}</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                disabled={true} // Disable for now..
                checked={data.settings.receiveEventNotifications}
                onChange={handleCheckboxChange("receiveEventNotifications")}
                value="eventNotifications"
              />
            }
            label={t("setupWizard:receiveEventNotifications")}
          />
        </FormGroup>
      </FormControl>
    </Grid>
  );
}

export default withStyles(styles)(GeneralSection);
