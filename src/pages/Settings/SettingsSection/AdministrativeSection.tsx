import React from "react";
import { useTranslation } from "react-i18next";

import {
  Grid,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl
} from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";

import { styles } from "styles";
import configurationJSON from "configuration.json";
import { FieldArray } from "formik";
import { profile_profile } from "queries/__generated__/profile";

interface Props extends WithStyles<typeof styles> {
  values: profile_profile;
}

function AdministrativeSection({ classes, values }: Props) {
  const { t } = useTranslation();
  return (
    <Grid item>
      <FormControl>
        <FormLabel>{t("setupWizard:translatorLanguages")}</FormLabel>
        <FieldArray
          name="translatorLanguages"
          render={arrayHelpers =>
            configurationJSON.translatorLanguages.map(l => (
              <FormControlLabel
                key={l.code}
                label={t(l.label)}
                control={
                  <Checkbox
                    checked={values.translatorLanguages.includes(l.code)}
                    onChange={e => {
                      if (e.target.checked) arrayHelpers.push(l.code);
                      else {
                        const idx = values.translatorLanguages.indexOf(l.code);
                        arrayHelpers.remove(idx);
                      }
                    }}
                  />
                }
              />
            ))
          }
        />
      </FormControl>
    </Grid>
  );
}

export default withStyles(styles)(AdministrativeSection);
