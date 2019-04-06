import React from "react";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { styles } from "src/styles";

interface Props extends WithStyles<typeof styles> {}

const Settings: React.FunctionComponent<Props> = ({ classes }) => {
  const { t, i18n } = useTranslation();

  const [values, setValues] = React.useState({
    title: "",
    description: ""
  });

  // Note: Pulling the available languages is not so straightforward. So have to loop through the resources object:
  // https://github.com/i18next/i18next/issues/1068
  return (
    <React.Fragment>
      <Typography variant="h3">{t("settings:title")}</Typography>
      <Card>
        <CardContent>
          <FormControl>
            <InputLabel>{t("settings:language")}</InputLabel>
            <Select
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
            >
              {Object.keys(i18n.options.resources || {}).map((l: string) => (
                <MenuItem key={l} value={l}>
                  {l}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(Settings);
