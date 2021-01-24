import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { WithStyles, withStyles, withTheme } from "@material-ui/core/styles";
import { getChapters_chapters_components } from "queries/__generated__/getChapters";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { styles } from "styles";
import { EditStates } from "types/editStates";

type ChapterState = {
  [key: string]: {
    [key in keyof typeof EditStates]?: number;
  };
};

interface Props extends WithStyles<typeof styles> {
  components: getChapters_chapters_components[];
}
const ChapterComponents: React.FC<Props> = ({ components }) => {
  const { t } = useTranslation("chapter");
  const chapterState: ChapterState = components.reduce(
    (acc, { state, type: { name } }) => ({
      ...acc,
      [name]: { [state]: (acc[name]?.[state as EditStates] || 0) + 1 },
    }),
    {} as ChapterState,
  );

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(chapterState).map(([typeName, counts]) => (
          <TableRow key={typeName}>
            <TableCell variant="head" padding="none">
              {typeName}
            </TableCell>
            <TableCell>
              <StateList>
                {Object.values(EditStates)
                  .filter((state) => !!counts[state])
                  .map((state) => (
                    <StateListItem
                      key={state}
                      state={state}
                      title={t(`chapters:editState${state}`)}
                    >
                      {counts[state]}
                    </StateListItem>
                  ))}
              </StateList>{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default withStyles(styles, { withTheme: true })(ChapterComponents);

const StateList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const StateListItem = withTheme(styled.li<{ state: EditStates }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  height: 30px;
  width: 30px;
  border-radius: 99px;
  padding: 0;
  background: ${({ state, theme: { editStateColors } }) => editStateColors[state]};
`);
