import * as React from "react";
import { FormikValues } from "formik";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { cloneDeep } from "lodash-es";

import { Theme, makeStyles } from "@material-ui/core/styles";
import { Grid, Drawer, Button, CircularProgress } from "@material-ui/core";
import { Settings as SettingsIcon, Save as SaveIcon } from "@material-ui/icons";

import Text from "components/Text";
import { BaseSettings, BaseSettingsProps } from "./BaseComponent";
import { TitleSettings } from "./components/TitleComponent";
import { TextSettings } from "./components/TextComponent";
import { DialogSettings } from "./components/Dialog/DialogComponent";
import { UPDATE_COMPONENT } from "queries/component";
import {
  getSelectedComponent_component_texts,
  getSelectedComponent_component_media,
  getSelectedComponent_component_texts_translations,
  getSelectedComponent_component_texts_translations_language,
  getSelectedComponent_component,
  getSelectedComponent_languages
} from "queries/__generated__/getSelectedComponent";
import { LanguageContext } from "theme";
import {
  api_text_insert_input,
  api_translation_insert_input,
  api_translation_constraint,
  api_translation_update_column,
  api_text_update_column
} from "__generated__/globalTypes";
import { CHAPTER_HEADER_PART } from "queries/chapters";
import { useParams } from "hooks/useRouter";
import { subscribeChapterById_chapter } from "queries/__generated__/subscribeChapterById";
import {
  updateComponent as TupdateComponent,
  updateComponentVariables
} from "queries/__generated__/updateComponent";

/**
 * Extends the autogenerated GraphQL type
 */
export interface ITranslation
  extends Omit<
    getSelectedComponent_component_texts_translations,
    "__typename" | "id" | "language"
  > {
  /**
   * Since the backend has currently a uuid for languages, we can use this to simplify lookups and decouple
   */
  languageCode?: string;
  id?: string;
  language?: getSelectedComponent_component_texts_translations_language;
}

export interface IText
  extends Omit<
    getSelectedComponent_component_texts,
    "__typename" | "id" | "translations"
  > {
  translations: ITranslation[];
  fk_component_id?: string;
  id?: string;
}

export interface ICrudTextOperations {
  upsert: IText[];
  delete: IText[];
  /**
   * In case all native languages of the texts should get deleted
   */
  deleteNativeLanguages?: boolean;
  /**
   * In case all native languages (activated by chapter) of this text should get created
   */
  createNativeLanguages?: boolean;
  createGerman?: boolean;
  createSwissGerman?: boolean;
}

export interface ICrudTranslationOperations {
  upsert: ITranslation[];
  delete: ITranslation[];
}

export interface ICrudMediaOperations {
  upsert: getSelectedComponent_component_media[];
  delete: getSelectedComponent_component_media[];
}

export interface SubmitConfig {
  /**
   * The "generic/no-sql" field of the component
   */
  settingsData?: object;
  /**
   * Usually should not be necessary, since an object
   * TODO: Do we ever need this?
   */
  texts?: ICrudTextOperations;
  /**
   * Translations CUD object. Contains on each translation the ref to text! (Hack...)
   */
  translations?: ICrudTranslationOperations;
  /**
   * An object containing the respective C(R)UD operations payloads. Since we don't "upate" media, only "create" and "delete" is supported
   */
  media?: ICrudMediaOperations;
}

// This defines a mapping of component setting type names to the React Component, used then to render the content and the settings
export const settingTypes: { [key: string]: any } = {
  default: BaseSettings,
  Title: TitleSettings,
  Text: TextSettings,
  Dialog: DialogSettings,
  TitleOfDialog: TitleSettings,
  TextOfDialog: TextSettings
};

interface SettingsContentProps extends BaseSettingsProps {
  type: string;
}

/**
 * "Dynamic" component type mapping component
 */
const SettingsContent = React.forwardRef<any, SettingsContentProps>(
  (props, ref) => {
    const { data, type, ...otherProps } = props;
    const Component = settingTypes[type] || settingTypes.default;
    return <Component ref={ref} data={data} {...otherProps} />;
  }
);

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    backgroundColor: theme.palette.grey[400]
  },
  container: {
    padding: theme.spacing(5),
    backgroundColor: theme.palette.grey[400]
  }
}));

interface ISettingsProps {
  component?: getSelectedComponent_component;
  languages?: getSelectedComponent_languages[];
  loading: boolean;
}

/**
 * The main Settings Component.
 * Consists of a header with generic, component type agnostic functionality and a "dynamic" settings content implementation depending on the component type
 */
const Settings = ({ component, languages, loading }: ISettingsProps) => {
  const classes = useStyles();
  const client = useApolloClient();
  // @ts-ignore
  let { subChapterId } = useParams();

  const [updateComponent, { loading: updateLoading }] = useMutation<
    TupdateComponent,
    updateComponentVariables
  >(UPDATE_COMPONENT, {
    onCompleted: () => client.writeData({ data: { selectedComponentId: null } })
  });

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const form = React.useRef<FormikValues>(null);

  const handleOnSaveClick = () => {
    if (!form || !form.current || form.current.handleSubmit(undefined)) {
      console.warn(
        "This component's setting widget is missing a Formik form implementation which handles the validation and submission!"
      );
    } else {
      form.current.validateForm(form.current.state.values);
      form.current.handleSubmit(undefined);
    }
  };

  /**
   * Updates the component and upserts "texts" and "media" and the nested translations. Will be called from the component implementation (Title, Text, ...)
   * Note: The component must already exist, supports only an "update" mutation! Creation of those entities actually happen on drop of component from selector in dropzone!
   * @param config
   */
  const handleOnSubmit = (config: SubmitConfig) => {
    const { settingsData, texts, translations } = config;

    // Initialization
    let deleteTranslationIds: string[] =
      (translations &&
        translations.delete.filter(t => !!t.id).map(t => t.id!)) ||
      [];

    // The component "settings" data, contained in a unstructered JSONB field
    const componentData = settingsData ? { data: settingsData } : {};

    // Text data
    const _texts = (texts && texts.upsert) || [];
    const upsertableTextData: api_text_insert_input[] = [];

    // Loop through each text (usually anyway just one), and prepare the nested objects for the mutation
    for (let i = 0; i < _texts.length; i++) {
      const _text = cloneDeep(_texts[i]);
      upsertableTextData.push({
        id: _text.id,
        fk_component_id: component && component.id,
        translatable: _text.translatable || false
      });
      const upsertableTranslations: api_translation_insert_input[] = []; // _text.translations;

      // TODO(df): Hack for now (since index doesn't have to be the same, but usually is), need to change to lookup based texts id... From client cache?
      const existingTranslations =
        (component && component.texts[i] && component.texts[i].translations) ||
        [];

      // Remove all native translations if applicable
      if (texts && texts.deleteNativeLanguages) {
        deleteTranslationIds = deleteTranslationIds.concat(
          existingTranslations
            .filter(
              (t: getSelectedComponent_component_texts_translations) =>
                !(
                  t.language.id === LanguageContext.ch ||
                  t.language.id === LanguageContext.de
                )
            )
            .map(
              (t: getSelectedComponent_component_texts_translations) => t.id
            ) || []
        );
        // Create new languages if applicable
      } else if (texts && texts.createNativeLanguages) {
        // Get all native languages of this chapter. Need this to generate the native languages on demand
        const chapter: subscribeChapterById_chapter | null = client.readFragment(
          {
            id: `api_chapter:${subChapterId}`,
            fragment: CHAPTER_HEADER_PART
          }
        );
        if (!chapter) {
          throw new Error("No chapter found in cache! Aborting...");
        }

        // Construct filter array of CH/DE and all prexisting native languages
        const existingLanguageCodes = existingTranslations.map(
          t => t.language.id
        );
        const filters = ([
          LanguageContext.ch,
          LanguageContext.de
        ] as string[]).concat(existingLanguageCodes);

        // Only keep those languages
        const creatableNativeLanguages = chapter.languages.filter(
          l => !filters.includes(l.language.id)
        );
        // Push to upsertableTranslations, so will be created
        creatableNativeLanguages.forEach(l =>
          upsertableTranslations.push({
            text_field: "",
            valid: false,
            fk_language_id: l.language.id
          })
        );
      }

      // Now actually fill the upsertable translations array
      _text.translations.forEach(t => {
        // Either the language is already prefilled or we need to get from the backend
        const language =
          t.language ||
          (languages && languages.find(l => l.id === t.languageCode));
        if (language) {
          upsertableTranslations.push({
            text_field: t.text_field,
            fk_language_id: language.id,
            valid: t.valid,
            id: t.id
          });
        } else {
          console.error(
            "Error! No langauge for this translation found in cache!"
          );
        }
      });

      // Finally construct
      upsertableTextData[i].translations = {
        data: upsertableTranslations,
        on_conflict: {
          constraint: api_translation_constraint.api_translation_pkey,
          update_columns: [
            api_translation_update_column.text_field,
            api_translation_update_column.valid
          ]
        }
      };
    }
    updateComponent({
      variables: {
        // If no changes in component, then we don't want to update and thus just send null
        componentId: component ? component.id : null,
        // The components table fields that should be updated
        componentData,
        // Texts are "upserted" (Check definition in static GQL document UPDATE_COMPONENT)
        textUpdateColumns: [api_text_update_column.translatable],
        textData: upsertableTextData,
        translationData: [],
        translationUpdateColumns: [
          api_translation_update_column.text_field,
          api_translation_update_column.valid
        ],
        deleteTextIds: [],
        deleteTranslationIds
      }
    });
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="bottom"
      open={!!component}
      onClick={handleBackgroundClick}
    >
      <Grid container className={classes.container} direction="row">
        <Grid item container xs={12} direction="row" justify="space-between">
          <Grid item container xs={9} direction="row" alignItems="center">
            <SettingsIcon />
            <Text
              variant="h5"
              translationOptions={{
                type: component && component.type.label
              }}
            >
              chapterEditor:settingsTitle
            </Text>
          </Grid>
          <Grid item xs={3} container alignItems="center" justify="flex-end">
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleOnSaveClick}
              disabled={loading || updateLoading}
            >
              <SaveIcon />
              <Text>save</Text>
            </Button>
          </Grid>
        </Grid>
        <Grid xs={12} item container direction="column">
          {loading && <CircularProgress />}
          {!loading && component ? (
            <SettingsContent
              ref={form}
              type={
                (component.type.frontendWidget &&
                  component.type.frontendWidget.name) ||
                component.type.name
              }
              data={component}
              onSubmit={handleOnSubmit}
            />
          ) : null}
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default React.memo(Settings);
