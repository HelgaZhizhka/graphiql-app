import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { urlValidationSchema } from '@/utils/validation';
import { ClearButton } from '@/components/FormsUI/ClearButton';
import styles from './InputEndpoint.module.scss';

type Props = {
  initialValue: string;
  onSubmit(value: string): void;
};

const InputEndpoint: React.FC<Props> = ({ initialValue, onSubmit }) => (
  <Formik
    initialValues={{ url: initialValue }}
    validationSchema={urlValidationSchema}
    onSubmit={(values) => {
      onSubmit(values.url);
    }}
  >
    {({ values, handleChange, handleBlur, touched, errors }) => (
      <Form>
        <div className={styles.root}>
          <TextField
            className={styles.input}
            name="url"
            label="Type API"
            variant="outlined"
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.url && !!errors.url}
            helperText={touched.url && errors.url}
            size="small"
          />
          <Button type="submit" variant="contained" disabled={!values.url || !!errors.url}>
            Connect
          </Button>
          {values.url && <ClearButton />}
        </div>
      </Form>
    )}
  </Formik>
);

export default InputEndpoint;
