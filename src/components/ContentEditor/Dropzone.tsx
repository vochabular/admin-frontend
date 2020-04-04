import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { PostAddOutlined } from "@material-ui/icons";
import Text from "components/Text";

const useStyles = makeStyles((theme: Theme) => ({
  container: (props: DropzoneProps) => ({
    flex: 1,
    backgroundColor: props.color,
    padding: 20,
    borderStyle: "dashed",
  }),
}));

interface DropzoneProps {
  color?: string;
}

/**
 * Signals the user that something can be dropped here...
 */
const Dropzone = ({ color = "black" }: DropzoneProps) => {
  const classes = useStyles({ color: color });
  return (
    <div className={classes.container}>
      <PostAddOutlined />
      <Text>chapterEditor:addFromComponentSelector</Text>
    </div>
  );
};

export default Dropzone;
