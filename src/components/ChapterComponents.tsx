import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { getChapters_chapters_components } from "queries/__generated__/getChapters";
import * as React from "react";
import { styles } from "styles";

enum States {
  C = "C",
  other = "other", // TODO
}
type ChapterState = {
  [key: string]: {
    [key in keyof typeof States]?: number;
  };
};

type ChapterComponent = getChapters_chapters_components;
interface Props extends WithStyles<typeof styles> {
  components: ChapterComponent[];
}

const ChapterComponents: React.FC<Props> = ({ components }) => {
  const chapterState: ChapterState = components.reduce(
    (acc, { state, type: { name } }) => ({
      ...acc,
      [name]: { [state]: (acc[name]?.[state as States] || 0) + 1 },
    }),
    {} as ChapterState,
  );

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {Object.values(States).map((state) => (
            <TableCell key={state}>
              <Typography></Typography>
              {state}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(chapterState).map(([typeName, counts]) => (
          <TableRow key={typeName}>
            <TableCell variant="head">{typeName}</TableCell>
            {Object.values(States).map((state) => (
              <TableCell key={state}>{counts[state]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default withStyles(styles, { withTheme: true })(ChapterComponents);
