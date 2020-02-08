import * as React from "react";
import { useApolloClient, useQuery } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import { Theme, Chip } from "@material-ui/core";

import { useAuth } from "contexts/AuthContext";
import { GET_LOCAL_EDITOR_LANGUAGE } from "queries/component";
import { getLocalEditorLanguage } from "queries/__generated__/getLocalEditorLanguage";
import {
  getProfile,
  getProfileVariables,
  getProfile_profiles_translatorLanguages_language
} from "queries/__generated__/getProfile";
import { GET_PROFILE } from "queries/users";
import { subscribeChapterById_chapter_languages } from "queries/__generated__/subscribeChapterById";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minWidth: 140
  },
  chip: {
    marginRight: theme.spacing(0.5)
  }
}));

interface LanguageContextSelectorProps {
  chapterLanguages?: subscribeChapterById_chapter_languages[];
}

/**
 * How the component should get rendered in the editor
 */
export default function LanguageContextSelector({
  chapterLanguages = []
}: LanguageContextSelectorProps) {
  const classes = useStyles();
  const client = useApolloClient();
  const { user } = useAuth();

  const email = (user && user.email) || "";
  const { data } = useQuery<getProfile, getProfileVariables>(GET_PROFILE, {
    variables: {
      email
    },
    skip: !email
  });
  const { data: editorState } = useQuery<getLocalEditorLanguage>(
    GET_LOCAL_EDITOR_LANGUAGE
  );
  const translatorLanguages =
    (data && data.profiles[0].translatorLanguages) || [];
  const selectedLanguage =
    (editorState && editorState.contentEditorLanguage) || "en";

  // Initialize the currentEditor language if not set
  React.useEffect(() => {
    if (!editorState || (editorState && !editorState.contentEditorLanguage)) {
      if (translatorLanguages.length) {
        // TODO(df): This actually must come differently.
        client.writeData({
          data: { contentEditorLanguage: translatorLanguages[0].language.id }
        });
      }
    }
  });

  function handleClick(
    language: getProfile_profiles_translatorLanguages_language
  ) {
    client.writeData({
      data: { contentEditorLanguage: language.id || "en" }
    });
  }

  return (
    <>
      {chapterLanguages.map(l => (
        <Chip
          key={l.id}
          label={l.language.id}
          variant="outlined"
          color={selectedLanguage === l.language.id ? "primary" : "default"}
          size="small"
          className={classes.chip}
          onClick={() => handleClick(l.language)}
          disabled={
            !translatorLanguages.some(t => t.language.id === l.language.id)
          }
        />
      ))}
    </>
  );
}
