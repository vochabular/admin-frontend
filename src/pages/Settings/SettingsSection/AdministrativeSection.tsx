import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/react-hooks";

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
import { getProfile_profiles } from "queries/__generated__/getProfile";
import { GET_LANGUAGES } from "queries/languages";
import { getLanguages } from "queries/__generated__/getLanguages";

interface Props extends WithStyles<typeof styles> {
  values: getProfile_profiles;
}

function AdministrativeSection({ classes, values }: Props) {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery<getLanguages>(GET_LANGUAGES);

  const languages = (data && data.languages) || [];
  return (
    <Grid item>
      <FormControl>
        <FormLabel>{t("setupWizard:translatorLanguages")}</FormLabel>
        <FieldArray
          name="translatorLanguages"
          render={arrayHelpers =>
            languages.map(l => (
              <FormControlLabel
                key={l.id}
                label={t(l.name)}
                control={
                  <Checkbox
                  /*
                    checked={values.translatorLanguages.includes(l.code)}
                    onChange={e => {
                      if (e.target.checked) arrayHelpers.push(l.code);
                      else {
                        const idx = values.translatorLanguages.indexOf(l.code);
                        arrayHelpers.remove(idx);
                      }
                    }}
                    */
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
