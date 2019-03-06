import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import LoginIcon from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import SaveIcon from "@material-ui/icons/Save";

import { styles } from "src/styles";
import theme from "src/theme";
import { UPSERT_CHAPTER } from "src/queries/chapters";
import { CircularProgress } from "@material-ui/core";

interface Props extends WithStyles<typeof styles> {}

const NewChapter = ({ classes }: Props) => {
  const [values, setValues] = React.useState({
    chapterNumber: "",
    title: "",
    description: ""
  });

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      [name]: event.currentTarget.value
    });
  };
  // Since useMutation currently doesn't return the second arguments such as loading, we can not use react-apollo-hooks for now...
  // https://github.com/trojanowski/react-apollo-hooks/issues/90
  // const upsertChapter = useMutation;
  return (
    <React.Fragment>
      <Typography variant="h3">Neues Kapitel anlegen</Typography>
      <Card>
        <CardContent>
          <form autoComplete="off">
            <TextField
              required
              type="number"
              id="chapterNumber"
              label="Kapitelnummer"
              value={values.chapterNumber}
              onChange={handleChange("chapterNumber")}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="title"
              label="Titel"
              value={values.title}
              placeholder={"Titel für das Kapitel"}
              onChange={handleChange("title")}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="description"
              label="Beschreibung"
              value={values.description}
              placeholder={"Beschreibe hier das Kapitel"}
              onChange={handleChange("description")}
              margin="normal"
              fullWidth
            />
            <Mutation mutation={UPSERT_CHAPTER}>
              {(createChapter, { data, loading }) => (
                <React.Fragment>
                  <Button
                    variant="contained"
                    size="large"
                    //className={classes.buttonSuccess}
                    color="primary"
                    disabled={loading}
                    onClick={() =>
                      createChapter({
                        variables: {
                          input: { chapterData: { title: values.title } }
                        }
                      })
                    }
                  >
                    {loading ? <CircularProgress size={24} /> : <SaveIcon />}
                    Speichern...
                  </Button>
                </React.Fragment>
              )}
            </Mutation>
          </form>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(NewChapter);
