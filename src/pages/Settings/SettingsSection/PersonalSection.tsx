import React from "react";
import { useTranslation } from "react-i18next";
import { Field } from "formik";
import {
  fieldToTextField,
  TextField,
  TextFieldProps
} from "formik-material-ui";

import MuiTextField from "@material-ui/core/TextField";
import { Grid, MenuItem } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "styles";
import i18n from "i18n";
import { useAuth } from "contexts/AuthContext";
import { getProfile_profiles } from "queries/__generated__/getProfile";

const UiLanguageField = (props: TextFieldProps) => (
  <MuiTextField
    {...fieldToTextField(props)}
    onChange={(event: any) => {
      const { value } = event.target;
      i18n.changeLanguage(value);
      props.form.setFieldValue(props.field.name, value ? value : "");
    }}
  />
);

const DefaultRoleField = (props: TextFieldProps) => {
  const { changeCurrentRole } = useAuth();
  return (
    <MuiTextField
      {...fieldToTextField(props)}
      onChange={(event: any) => {
        const { value } = event.target;
        changeCurrentRole(value);
        props.form.setFieldValue(props.field.name, value ? value : "");
      }}
    />
  );
};

interface Props extends WithStyles<typeof styles> {
  values?: getProfile_profiles;
  setFieldValue?: CallableFunction;
}

function PersonalSection({ classes, values, setFieldValue }: Props) {
  const { t } = useTranslation();

  const { user } = useAuth();

  const roles = (user && user.allowedRoles) || [];
  return (
    <Grid>
      <Field
        type="text"
        name="language"
        component={UiLanguageField}
        label={t("settings:uiLanguage")}
        helperText={t("settings:uiLanguageHelperText")}
        select
        margin="normal"
        fullWidth
      >
        {Object.keys(i18n.options.resources || {}).map((l: string) => (
          <MenuItem key={l} value={l}>
            {l}
          </MenuItem>
        ))}
      </Field>
      <Field
        name="firstname"
        label={t("settings:firstname")}
        component={TextField}
        margin="normal"
        fullWidth
      />
      <Field
        name="lastname"
        label={t("settings:lastname")}
        component={TextField}
        margin="normal"
        fullWidth
      />
      {roles.length ? (
        <Field
          type="text"
          name="current_role"
          label={t("settings:currentRoleLabel")}
          select
          helperText={t("settings:currentRoleHelperText")}
          margin="normal"
          component={DefaultRoleField}
          fullWidth
        >
          {roles.map(r => (
            <MenuItem key={r} value={r}>
              {t(r)}
            </MenuItem>
          ))}
        </Field>
      ) : null}
    </Grid>
  );
}

export default withStyles(styles)(PersonalSection);
