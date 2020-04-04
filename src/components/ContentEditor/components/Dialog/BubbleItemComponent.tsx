import * as React from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Select } from "formik-material-ui";
import { useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";

import BaseComponent, {
  BaseComponentProps,
  BaseSettingsProps,
} from "../../BaseComponent";
import {
  getDataOfDialog,
  getDataOfDialogVariables,
} from "./__generated__/getDataOfDialog";
import { GET_CHARACTERS_BY_IDS, GET_CHARACTER_BY_ID } from "queries/characters";
import {
  getCharactersByIds,
  getCharactersByIdsVariables,
} from "queries/__generated__/getCharactersByIds";
import {
  getCharacterByIdVariables,
  getCharacterById,
} from "queries/__generated__/getCharacterById";

const GET_DATA_OF_DIALOG = gql`
  query getDataOfDialog($id: uuid!) {
    component: api_component_by_pk(id: $id) {
      id
      bubble: parent {
        id
        dialog: parent {
          id
          characters: data(path: "characters")
        }
      }
    }
  }
`;

/**
 * Validation Schema definition of the input fields of this component
 */
const BubbleItemSchema = Yup.object().shape({
  // BubbleItem: Yup.string().required(i18next.t("required")),
});

interface BubbleItemSettingsData {
  character: String;
}

export interface BubbleItemSettingsProps extends BaseSettingsProps {}

/**
 * Setting widget's dynamic component view
 */
export const BubbleItemSettings = React.forwardRef<
  any,
  BubbleItemSettingsProps
>((props, ref) => {
  const { onSubmit, data } = props;
  // The "settings" JSONB field
  const { data: settingsData } = data;
  const { character: bubbleItemCharacter } = settingsData;

  const { t } = useTranslation();

  // Get characters selected in the parent dialog component. Used then to query the actual character data...
  const { data: dialogData, loading: loadingDataOfDialog } = useSubscription<
    getDataOfDialog,
    getDataOfDialogVariables
  >(GET_DATA_OF_DIALOG, {
    variables: { id: data.id },
  });
  const characterIds: string[] =
    dialogData?.component?.bubble?.dialog?.characters || [];

  // Now get the available characters
  const {
    data: availableCharacterData,
    loading: loadingCharacters,
  } = useSubscription<getCharactersByIds, getCharactersByIdsVariables>(
    GET_CHARACTERS_BY_IDS,
    {
      variables: { ids: characterIds },
    }
  );

  const handleCharacterSave = ({ character }: BubbleItemSettingsData) => {
    const newSettingsData = { ...settingsData, character };
    onSubmit({ settingsData: newSettingsData });
  };

  const isLoading = loadingDataOfDialog || loadingCharacters;

  if (isLoading) return null;

  return (
    <Formik
      ref={ref}
      initialValues={{
        character: bubbleItemCharacter || "",
      }}
      validationSchema={BubbleItemSchema}
      onSubmit={handleCharacterSave}
    >
      {(props) => (
        <Form>
          <Field
            type="text"
            name="character"
            label={t("editor:character")}
            component={Select}
            multiple={false}
            disabled={isLoading}
          >
            {availableCharacterData &&
              availableCharacterData.characters.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {`${c.informalName} - ${c.formalName} - ${c.speaker}`}
                </MenuItem>
              ))}
          </Field>
        </Form>
      )}
    </Formik>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
}));

export interface BubbleItemComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor
 */
const BubbleItemComponent = ({
  data,
  ...otherProps
}: BubbleItemComponentProps) => {
  const classes = useStyles();
  const { character } = data?.data;

  const { data: characterData } = useSubscription<
    getCharacterById,
    getCharacterByIdVariables
  >(GET_CHARACTER_BY_ID, { variables: { id: character }, skip: !character });

  const preview = characterData ? (
    <div className={classes.container}>
      {characterData.character?.informalName}
    </div>
  ) : null;

  return (
    <BaseComponent
      preview={preview}
      data={data}
      renderChildrenInline
      {...otherProps}
    />
  );
};

export default BubbleItemComponent;
