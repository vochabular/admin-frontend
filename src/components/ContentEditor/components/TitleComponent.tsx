import * as React from "react";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

import BaseComponent, { BaseComponentProps } from "../BaseComponent";
import Text from "components/Text";

export const TitleSettings = () => <Text>Hello title?</Text>;

const useStyles = makeStyles((theme: Theme) => ({}));

export interface TitleComponentProps extends BaseComponentProps {}

const TitleComponent = ({ ...otherProps }: TitleComponentProps) => {
  const classes = useStyles();

  const preview = <Text>Preview...</Text>;

  return <BaseComponent preview={preview} {...otherProps} />;
};

export default TitleComponent;
