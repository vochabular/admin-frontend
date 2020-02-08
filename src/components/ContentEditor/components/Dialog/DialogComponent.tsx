import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Select } from "formik-material-ui";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";

import BaseComponent, {
  BaseComponentProps,
  BaseSettingsProps
} from "../../BaseComponent";
import Text from "components/Text";
import { useSubscription } from "@apollo/react-hooks";
import { GET_ALL_CHARACTERS } from "queries/characters";
import { getCharacters } from "queries/__generated__/getCharacters";

interface DialogSettingsData {
  characters: String[];
}

/**
 * Validation Schema definition of the input fields of this component
 * TODO(df): How do we do "dynamic" fields validation?
 */
const DialogSchema = Yup.object().shape({
  // Dialog: Yup.string().required(i18next.t("required"))
});

export interface DialogSettingsProps extends BaseSettingsProps {}

/**
 * Setting widget's dynamic component view
 */
export const DialogSettings = React.forwardRef<any, DialogSettingsProps>(
  (props, ref) => {
    const { data, onSubmit } = props;

    // The "settings" JSONB field
    const { data: settingsData } = data;

    const { characters: dialogCharacters = [] } = settingsData;
    const { data: allCharacterData, loading, } = useSubscription<getCharacters>(GET_ALL_CHARACTERS);

    const handleCharacterSave = ({ characters }: DialogSettingsData) => {
      const newSettingsData = { ...settingsData, characters };
      onSubmit({ settingsData: newSettingsData })
    }

    return (
      <Formik
        ref={ref}
        initialValues={{ characters: dialogCharacters.length ? dialogCharacters : [] }}
        validationSchema={DialogSchema}
        onSubmit={handleCharacterSave}
      >
        {props => (
          <Form>
            <Field
              type="text"
              name="characters"
              component={Select}
              multiple={true}
              disabled={loading}
            >
              {allCharacterData && allCharacterData.characters.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {`${c.informalName} - ${c.formalName} - ${c.speaker}`}
                </MenuItem>
              ))}
            </Field>
          </Form>
        )}
      </Formik>
    );
  }
);

const useStyles = makeStyles((theme: Theme) => ({
  container: { margin: 10 }
}));

export interface DialogComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor
 */
const DialogComponent = ({ data, ...otherProps }: DialogComponentProps) => {
  const classes = useStyles();
  const numberOfCharacters = data?.data?.characters?.length || 0;
  const preview = (
  <><Text className={classes.container} translationOptions={{ count: numberOfCharacters}}>characterWithCount</Text></>
  );

  return <BaseComponent preview={preview} data={data} {...otherProps} />;
};

export default DialogComponent;
