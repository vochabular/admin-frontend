import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import { styles } from "styles";

interface Props extends WithStyles<typeof styles> {
  path: string;
  helperText: string;
  icon: React.ReactNode;
}

const LinkCard = ({ classes, path, icon, helperText }: Props) => {
  const { t } = useTranslation();

  // Note: MUI links together with react-router-dom and Typescript are a bit tricky due to their dynamic nature
  // See the discussion and provided solutions here... https://github.com/mui-org/material-ui/issues/7877
  // <Button component={Link} {...{ to: "/about" } as any} />
  return (
    <Card>
      <CardActionArea component={RouterLink} {...{ to: path } as any}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {t(helperText)}
          </Typography>
          <Typography>{icon}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(LinkCard);
