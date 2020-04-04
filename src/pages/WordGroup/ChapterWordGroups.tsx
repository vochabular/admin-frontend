import * as React from "react";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import { useSubscription } from "@apollo/react-hooks";import { RouteComponentProps } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";

import { styles } from "styles";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import SectionCardContainer from "../../components/SectionCardContainer";
import Section from "../../components/Section";
import {GET_CHAPTER_WORDGROUPS_BY_CHAPTER_ID} from "../../queries/chapters";
import {
  subscribeChaptersWordGroupsByChapterId,
  subscribeChaptersWordGroupsByChapterId_chapters_wordgroups
} from "../../queries/__generated__/subscribeChaptersWordGroupsByChapterId";
import WordGroupCard from "../../components/WordGroupCard";

import LinkCard from "../../components/LinkCard";

interface WordGroupRouterProps {
  id: string;
}

interface Props
  extends RouteComponentProps<WordGroupRouterProps>,
    WithStyles<typeof styles> {}

const ChapterWordGroups = ({ classes, match }: Props) => {
  const { t } = useTranslation();

  const {data, error, loading} = useSubscription<subscribeChaptersWordGroupsByChapterId>(GET_CHAPTER_WORDGROUPS_BY_CHAPTER_ID, {
    variables: {
      id: match.params.id
    },
    // skip: match.params.id === "new"
  });

  // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
  // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
  // <Button component={Link} {...{ to: "/about" } as any} />
  let chapter_name =
    data && data.chapters && data.chapters.languages && data.chapters.languages.length ?
      data.chapters.languages.map((language) => language.title) : "";
  return <Section title={t("wordGroups:wordGroupsChapter") + ` ${chapter_name}`}>
    <SectionCardContainer>
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={!loading && data && !!data.chapters && !!data.chapters.wordgroups && !data.chapters.wordgroups.length}
      />
      {data &&
      data.chapters &&
      data.chapters.wordgroups &&
      data.chapters.wordgroups.map((w: subscribeChaptersWordGroupsByChapterId_chapters_wordgroups | null) => (
        w ?
          <Grid item key={w.id}>
            <WordGroupCard wordGroup={w}/>
          </Grid> : null
      ))}
      <Grid item>
        <LinkCard
          path={`/wordgroups/new`}
          icon={<AddIcon/>}
          helperText="wordGroups:createNewWordGroup"
        />
      </Grid>
    </SectionCardContainer>
  </Section>;
};

export default withStyles(styles, { withTheme: true })(ChapterWordGroups);
