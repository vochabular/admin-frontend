import * as React from "react";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";

import { styles } from "styles";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import SectionCardContainer from "../../components/SectionCardContainer";
import Section from "../../components/Section";
import { convertGlobalToDbId } from "../../helpers";

import WordGroupCard from "../../components/WordGroupCard";
import LinkCard from "../../components/LinkCard";
import { GET_CHAPTER_BY_ID } from "queries/chapters";

interface WordGroupRouterProps {
  id: string;
}

interface Props
  extends RouteComponentProps<WordGroupRouterProps>,
    WithStyles<typeof styles> {}

const ChapterWordGroups = ({ classes, match }: Props) => {
  const { t } = useTranslation();

  const { data, error, loading } = useQuery(GET_CHAPTER_BY_ID, {
    variables: {
      id: convertGlobalToDbId(match.params.id)
    },
    skip: match.params.id === "new"
  });

  // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
  // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
  // <Button component={Link} {...{ to: "/about" } as any} />
  let chapter_name =
    data && data.chapter
      ? `${data.chapter.titleDE} / ${data.chapter.titleCH}`
      : "";
  return (
    <Section title={t("wordGroups:wordGroupsChapter") + ` ${chapter_name}`}>
      <SectionCardContainer>
        <BusyOrErrorCard
          loading={loading}
          error={error}
          noResults={
            !loading &&
            data &&
            !!data.chapter &&
            !!data.chapter.wordGroups &&
            !data.chapter.wordGroups.edges.length
          }
        />
        <Grid item>
          <LinkCard
            path={`/wordgroups/new`}
            icon={<AddIcon />}
            helperText="wordGroups:createNewWordGroup"
          />
        </Grid>
      </SectionCardContainer>
    </Section>
  );
};

export default withStyles(styles, { withTheme: true })(ChapterWordGroups);
