import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/react-hooks";

import {
  Grid,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "styles";
import { FieldArray } from "formik";
import { GET_LANGUAGES } from "queries/languages";
import { getLanguages } from "queries/__generated__/getLanguages";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import { profile_profile } from "queries/__generated__/profile";

interface Props extends WithStyles<typeof styles> {
  values: profile_profile;
}

function AdministrativeSection({ classes, values }: Props) {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery<getLanguages>(GET_LANGUAGES);

  const languages = (data && data.languages) || [];

  return (
    <Grid item>
      <FormControl>
        <FormLabel>{t("setupWizard:translatorLanguages")}</FormLabel>
        <BusyOrErrorCard
          error={error}
          loading={loading}
          showOnNoResults={false}
        />
        <FieldArray
          name="translatorLanguages"
          render={(arrayHelpers) =>
            languages.map((l, index) => (
              <FormControlLabel
                key={l.id}
                label={t(l.name)}
                control={
                  <Checkbox
                    checked={values.translatorLanguages?.some(
                      (t) => t.id === l.id
                    )}
                    onChange={(e) => {
                      // We get the UPDATED value, so need to change the array accordingly
                      if (e.target.checked) {
                        arrayHelpers.insert(index, l);
                      } else {
                        arrayHelpers.remove(index);
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
