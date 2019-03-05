import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";
import auth0Client from "../../auth/Auth";

import { styles } from "../../styles";
import ChapterSection from "./ChapterSection";
import VoggiSection from "./VoggiSection";
import { Button } from "@material-ui/core";

// TODO: We should have the AppBar in a own component. However, that messes up the layout...
// import AppBar from "../components/AppBar";

interface Props extends WithStyles<typeof styles> {}

const Dashboard: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div>
      <div>
        <Typography variant="h4" gutterBottom component="h2">
          Kapitel
        </Typography>
        <ChapterSection />
      </div>

      <div>
        <Typography variant="h4" gutterBottom component="h2">
          Voggi-Liste
        </Typography>
        <VoggiSection />
      </div>
    </div>
  );
};

export default withStyles(styles)(Dashboard);
