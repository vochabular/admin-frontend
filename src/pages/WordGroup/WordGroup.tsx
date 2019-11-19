import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import { useSubscription } from "@apollo/react-hooks";
import { RouteComponentProps } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

import { styles } from "styles";
import NewWordGroup from "./WordGroupEditor";
import { GET_WORDGROUP_BY_ID } from "queries/wordgroups";
import BusyOrErrorCard from "components/BusyOrErrorCard";
import { useTranslation } from "react-i18next";
import Section from "../../components/Section";
import SectionCardContainer from "../../components/SectionCardContainer";
import { Grid } from "@material-ui/core";
import WordCard from "../../components/WordCard";
import LinkCard from "../../components/LinkCard";
import { subscribeWordGroupById } from "queries/__generated__/subscribeWordGroupById";

// These can come from the router... See the route definitions
interface WordGroupRouterProps {
  id: string;
}

interface Props
  extends RouteComponentProps<WordGroupRouterProps>,
    WithStyles<typeof styles> {}

const WordGroup = ({ classes, match }: Props) => {
  const { t } = useTranslation();

  const { loading, data, error } = useSubscription<subscribeWordGroupById>(
    GET_WORDGROUP_BY_ID,
    {
      variables: {
        id: match.params.id
      },
      // skip: match.params.id === "new"
    }
  );

  if (match.params.id === "new") {
    return <NewWordGroup />;
  }

  let title_name = ` ${
    data && data.wordGroup ? data.wordGroup.titleDe : ""
  } / ${data && data.wordGroup ? data.wordGroup.titleCh : ""}`;

  return (
    <Section title={t("words:wordGroup") + ` ${title_name}`}>
      <SectionCardContainer>
        <BusyOrErrorCard
          loading={loading}
          error={error}
          noResults={
            !loading &&
            data &&
            !!data.wordGroup &&
            !!data.wordGroup.words &&
            !data.wordGroup.words.length
          }
        />
        {data &&
          data.wordGroup &&
          data.wordGroup.words &&
          data.wordGroup.words.map(w =>
            w ? (
              <Grid item key={w.id}>
                <WordCard word={w.word} wordGroupId={match.params.id} />
              </Grid>
            ) : null
          )}
        <Grid item>
          <LinkCard
            path={`/wordgroups/${match.params.id}/word/new`}
            icon={<AddIcon />}
            helperText="wordGroups:addWordToWordGroup"
          />
        </Grid>
      </SectionCardContainer>
    </Section>
  );
};

export default withStyles(styles, { withTheme: true })(WordGroup);
