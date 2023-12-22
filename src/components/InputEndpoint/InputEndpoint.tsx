import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { urlValidationSchema } from '@/utils/validation';
import { ClearButton } from '@/components/FormsUI/ClearButton';
import styles from './InputEndpoint.module.scss';

type Props = {
  initialValue: string;
  onSubmit(value: string): void;
  onClear(): void;
};

const InputEndpoint: React.FC<Props> = ({ initialValue, onSubmit, onClear }) => (
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
            label="Type API with Cors support"
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
          {values.url && <ClearButton onClear={onClear} />}
        </div>
      </Form>
    )}
  </Formik>
);

export default InputEndpoint;
