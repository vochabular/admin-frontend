import * as React from "react";
import {useTranslation} from "react-i18next";

import {withStyles, WithStyles} from "@material-ui/core/styles";
import {useQuery} from "react-apollo-hooks";
import {RouteComponentProps} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import {styles} from "styles";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import SectionCardContainer from "../../components/SectionCardContainer";
import Section from "../../components/Section";
import {GET_CHAPTER_WORDGROUPS_BY_CHAPTER_ID} from "../../queries/chapters";
import {convertGlobalToDbId} from "../../helpers";
import {
  chaptersWordGroupsByChapterId,
  chaptersWordGroupsByChapterId_chapter_wordGroups_edges
} from "../../queries/__generated__/chaptersWordGroupsByChapterId";
import WordGroupCard from "../../components/WordGroupCard";

interface WordGroupRouterProps {
  id: string;
}

interface Props extends RouteComponentProps<WordGroupRouterProps>, WithStyles<typeof styles> {
}

const ChapterWordGroups = ({classes, match}: Props) => {
  const {t} = useTranslation();

  const {data, error, loading} = useQuery<chaptersWordGroupsByChapterId>(GET_CHAPTER_WORDGROUPS_BY_CHAPTER_ID, {
    variables: {
      id: convertGlobalToDbId(match.params.id)
    },
    skip: match.params.id === "new"
  });

  // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
  // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
  // <Button component={Link} {...{ to: "/about" } as any} />
  let chapter_name = data && data.chapter ? `${data.chapter.titleDE} / ${data.chapter.titleCH}` : '';
  return <Section title={t("wordGroups:wordGroupsChapter") + ` ${chapter_name}`}>
    <SectionCardContainer>
      <BusyOrErrorCard
        loading={loading}
        error={error}
        noResults={!loading && data && !!data.chapter && !!data.chapter.wordGroups && !data.chapter.wordGroups.edges.length}
      />
      {data &&
      data.chapter &&
      data.chapter.wordGroups &&
      data.chapter.wordGroups.edges.map((w: chaptersWordGroupsByChapterId_chapter_wordGroups_edges | null) => (
        w && w.node ?
          <Grid item key={w.node.id}>
            <WordGroupCard wordGroup={w.node}/>
          </Grid> : null
      ))}
    </SectionCardContainer>
  </Section>;
};

export default withStyles(styles, {withTheme: true})(ChapterWordGroups);
