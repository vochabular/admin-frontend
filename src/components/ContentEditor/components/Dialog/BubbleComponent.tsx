import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { TextField } from "formik-material-ui";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link as LinkIcon } from "@material-ui/icons";

import BaseComponent, {
  BaseComponentProps,
  BaseSettingsProps
} from "../../BaseComponent";
import { ICrudMediaOperations, IMedia } from "components/ContentEditor/Settings";
import Diff from "helper/Diff";
import { cloneDeep } from "lodash-es";


interface IBubbleForm {
  url?: string;
  languageCode?: string;
}

/**
 * Validation Schema definition of the input fields of this component
 */
const BubbleSchema = Yup.object().shape({
  url: Yup.string(),
  languageCode: Yup.string(),
});

export interface BubbleSettingsProps extends BaseSettingsProps {}

/**
 * Setting widget's dynamic component view
 */
export const BubbleSettings = React.forwardRef<any, BubbleSettingsProps>(
  (props, ref) => {
    const { onSubmit, data } = props;
    const { t } = useTranslation();
    // The "settings" JSONB field
    const { data: settingsData, media: mediaArray } = data;

    const { type, url } = mediaArray[0] || {};


    const initialValues = {
      type: type || "",
      url: url || "",
    };

    const handleFormSave = (values: IBubbleForm) => {
      const mediaPayload: ICrudMediaOperations = { upsert: [], delete: [] };

      // get diff of initial and current form values
      const result = new Diff(initialValues, values);

      // skip if nothing has changed
      if (!result.isEqual) {
        const { url, languageCode } = values;
        let media: IMedia = cloneDeep(data.media[0]) || {};
        media.type = "audio";
        media.url = url || "";
        mediaPayload.upsert.push(media);
        const newSettingsData = { ...settingsData, languageCode };
        onSubmit({ settingsData: newSettingsData, media: mediaPayload })
      }
    }

    return (
      <Formik
        ref={ref}
        initialValues={initialValues}
        validationSchema={BubbleSchema}
        onSubmit={handleFormSave}
      >
        {props => (
          <Form>
            <Field
              type="string"
              name="url"
              label={t("editor:url")}
              helperText={t("editor:url")}
              component={TextField}
              margin="normal"
              fullWidth
            />
          </Form>
        )}
      </Formik>
    );
  }
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {}
}));

export interface BubbleComponentProps extends BaseComponentProps {}

/**
 * How the component should get rendered in the editor
 */
const BubbleComponent = ({ data, ...otherProps }: BubbleComponentProps) => {
  const classes = useStyles();

  const { media } = data;
  const link = media[0];

  const preview = link && link.url && <div className={classes.container}><LinkIcon /></div>;

  return <BaseComponent preview={preview} data={data} {...otherProps} />;
};

export default BubbleComponent;
