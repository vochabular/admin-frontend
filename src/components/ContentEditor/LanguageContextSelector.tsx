import * as React from "react";
import { useApolloClient, useQuery } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

import { useAuth } from "contexts/AuthContext";
import { GET_LOCAL_EDITOR_LANGUAGE } from "queries/component";
import { getLocalEditorLanguage } from "queries/__generated__/getLocalEditorLanguage";
import {
  getProfile,
  getProfileVariables
} from "queries/__generated__/getProfile";
import { GET_PROFILE } from "queries/users";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    //
  }
}));

interface LanguageContextSelectorProps {}

/**
 * How the component should get rendered in the editor
 */
const LanguageContextSelector = (props: LanguageContextSelectorProps) => {
  const classes = useStyles();
  const client = useApolloClient();
  const { user } = useAuth();

  const email = (user && user.email) || "";

  const { data, loading, error } = useQuery<getProfile, getProfileVariables>(
    GET_PROFILE,
    {
      variables: {
        email
      },
      skip: !email
    }
  );

  console.log(data);

  const { data: editorState } = useQuery<getLocalEditorLanguage>(
    GET_LOCAL_EDITOR_LANGUAGE
  );

  // Initialize the currentEditor language if not set
  React.useEffect(() => {
    if (!editorState || (editorState && !editorState.contentEditorLanguage)) {
      const lang =
        data && data.profiles && data.profiles[0].translatorLanguages[0];
      if (lang) {
        // TODO(df): This actually must come differently.
        client.writeData({ data: { contentEditorLanguage: lang } });
      }
    }
  });

  const languages = (data && data.profiles[0].translatorLanguages) || [];
  const selectedLanguage =
    (editorState && editorState.contentEditorLanguage) || "en";

  function handleChange(
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) {
    client.writeData({
      data: { contentEditorLanguage: event.target.value || "en" }
    });
  }

  return (
    <FormControl disabled={languages.length < 2} className={classes.container}>
      <InputLabel>Current native language</InputLabel>
      {!loading && !error ? (
        <Select value={selectedLanguage} onChange={handleChange}>
          {languages.map(l => (
            <MenuItem key={l.id} value={l.language.name}>
              {l}
            </MenuItem>
          ))}
        </Select>
      ) : null}
    </FormControl>
  );
};

export default LanguageContextSelector;
