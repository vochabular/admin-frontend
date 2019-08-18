import * as React from "react";

import { Theme, makeStyles } from "@material-ui/core/styles";
import { Grid, Drawer, Button } from "@material-ui/core";

import Text from "components/Text";
import { Settings as SettingsIcon, Save as SaveIcon } from "@material-ui/icons";
import { BaseSettings } from "./BaseComponent";
import { TitleSettings } from "./components/TitleComponent";
import { TextSettings } from "./components/TextComponent";
import { useQuery } from "@apollo/react-hooks";
import {
  GET_SELECTED_COMPONENT,
  GET_LOCAL_SELECTED_COMPONENT_ID
} from "queries/component";

// This defines a mapping of component setting type names to the React Component, used then to render the content and the settings
export const settingTypes: { [key: string]: any } = {
  default: BaseSettings,
  Title: TitleSettings,
  Text: TextSettings
};

interface SettingsContentProps {
  type: string;
}

const SettingsContent = ({ type }: SettingsContentProps) => {
  const Component = settingTypes[type] || settingTypes.default;
  return <Component />;
};

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    backgroundColor: theme.palette.grey[400]
  },
  container: {
    height: "100px",
    padding: theme.spacing(5),
    backgroundColor: theme.palette.grey[400]
  }
}));

const Settings = () => {
  const classes = useStyles();

  /*
  const { selectedComponent } = useSelector<TAppState, IContentEditorState>(
    state => state.contentEditor
  );
  */

  const { data: selectedComponentIdData } = useQuery(
    GET_LOCAL_SELECTED_COMPONENT_ID
  );
  const { selectedComponentId } = selectedComponentIdData;
  const { data } = useQuery(GET_SELECTED_COMPONENT, {
    skip: !selectedComponentId
  });
  const { component: selectedComponent = undefined } = data || {};

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="bottom"
      open={!!selectedComponent}
    >
      <Grid container className={classes.container} direction="row">
        <Grid item container xs={12} direction="row" justify="space-between">
          <Grid item container xs={9} direction="row" alignItems="center">
            <SettingsIcon />
            <Text variant="h5">chapterEditor:settingsTitle</Text>
          </Grid>
          <Grid item xs={3} container alignItems="center" justify="flex-end">
            <Button variant="contained" size="small" color="primary">
              <SaveIcon />
              <Text>save</Text>
            </Button>
          </Grid>
        </Grid>
        <Grid xs={12} item container>
          {selectedComponent ? (
            <SettingsContent type={selectedComponent.type.name} />
          ) : null}
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default Settings;
