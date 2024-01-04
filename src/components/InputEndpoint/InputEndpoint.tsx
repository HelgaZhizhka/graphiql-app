import { useRef, useEffect } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { urlValidationSchema } from '@/utils/validation';
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { ClearButton } from '@/components/FormsUI/ClearButton';
import styles from './InputEndpoint.module.scss';

type Props = {
  initialValue: string;
  onSubmit(value: string): void;
  onClear(): void;
};

const InputEndpoint: React.FC<Props> = ({ initialValue, onSubmit, onClear }) => {
  const { state } = useLocale();
  const { strings } = state;

  const formikRef = useRef<FormikProps<{ url: string }>>(null);

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.validateForm();
    }
  }, [strings]);

  return (
    <Formik
      initialValues={{ url: initialValue }}
      validationSchema={urlValidationSchema(strings)}
      onSubmit={(values) => {
        onSubmit(values.url);
      }}
      innerRef={formikRef}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form>
          <div className={styles.root}>
            <TextField
              className={styles.input}
              name="url"
              label={strings.labelInputApi}
              variant="outlined"
              value={values.url}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.url && !!errors.url}
              helperText={touched.url && errors.url}
              size="small"
            />
            <Button type="submit" variant="contained" disabled={!values.url || !!errors.url}>
              {strings.buttonConnect}
            </Button>
            {values.url && <ClearButton onClear={onClear} />}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InputEndpoint;
