import React, { ReactNode } from "react";
import clsx from "clsx";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button, { ButtonProps } from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center"
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative"
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700]
      }
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    }
  })
);

interface IActionButtonProps extends ButtonProps {
  loading: boolean;
  success?: boolean;
  children?: ReactNode;
}

export default function ActionButton({
  loading,
  success,
  children,
  ...otherProps
}: IActionButtonProps) {
  const classes = useStyles({});

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button className={buttonClassname} disabled={loading} {...otherProps}>
          {children}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
