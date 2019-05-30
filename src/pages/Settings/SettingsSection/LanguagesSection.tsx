import React from "react";
import { useTranslation } from "react-i18next";

import { MenuItem, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";

import { styles } from "src/styles";
import configurationJSON from "src/configuration.json";
import { Field, FieldArray } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";

interface Props extends WithStyles<typeof styles> {
  values?: any;
}

function LanguagesSection({ classes, values }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <Grid item sm={6}>
      <Field
        type="text"
        name="language"
        label={t("settings:uiLanguage")}
        select
        margin="normal"
        component={TextField}
        fullWidth
      >
        {Object.keys(i18n.options.resources || {}).map((l: string) => (
          <MenuItem key={l} value={l}>
            {l}
          </MenuItem>
        ))}
      </Field>

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
    </Grid>
  );
}

export default withStyles(styles)(LanguagesSection);
