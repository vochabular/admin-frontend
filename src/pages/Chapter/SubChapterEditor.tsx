import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "src/styles";
import theme from "src/theme";
import ContentEditor from "src/components/ContentEditor/ContentEditor";

const mockData = [
  {
    id: 1,
    title: "TEST 1",
    components: [
      {
        type: "title",
        data: { settings: { languages: ["de", "ch", "native"] } }
      },
      { type: "text", data: "Sub comp 2" }
    ]
  },
  { id: 2, title: "TEST 2" }
];

interface Props extends WithStyles<typeof styles> {}

/**
 * The subchapter Editor. Depending on the role, should display different "functionality"
 */
const SubChapterEditor = ({ classes }: Props) => {
  return <ContentEditor data={mockData} />;
};

export default withStyles(styles, { withTheme: true })(SubChapterEditor);
