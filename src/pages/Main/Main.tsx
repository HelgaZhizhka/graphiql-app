import { useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { useAppDispatch, useResizableHeight, useResizableWidth } from '@/hooks';
import { parseVariables } from '@/utils/parseVariables';
import { setError } from '@/store/slices/messageSlice';
import { useLazyFetchSchemaQuery, useSendQueryMutation } from '@/store/api/apiService';
import { setLoading, setSchema } from '@/store/slices/schemaSlice';
import { SideBar } from '@/components/SideBar';
import { InputEndpoint } from '@/components/InputEndpoint';
import { CodeEditor } from '@/components/CodeEditor';
import { EditorTabs } from '@/components/EditorTabs';
import { ResizableDivider } from '@/components/ResizableDivider';
import styles from './Main.module.scss';
import { Box } from '@mui/material';
import { handlePrettifyCode } from '@/utils/handlePrettifyCode';

const Main: React.FC = () => {
  const { editorHeight, tabsHeight, handleResizeHeight } = useResizableHeight(300, 50, 50, 400);
  const { editorWidth, responseWidth, handleResizeWidth } = useResizableWidth(
    window.innerWidth / 2,
    window.innerWidth / 2,
    50,
    window.innerWidth - 150
  );
  const [sendQuery] = useSendQueryMutation();
  const [apiUrl, setApiUrl] = useState('');
  const [code, setCode] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [response, setResponse] = useState('');
  const dispatch = useAppDispatch();
  const [fetchSchema, { error }] = useLazyFetchSchemaQuery();

  const handleApiSubmit = async (newApiUrl: string) => {
    setApiUrl(newApiUrl);
    dispatch(setLoading(true));
    try {
      const schemaData = await fetchSchema(newApiUrl).unwrap();
      dispatch(setSchema(schemaData));
      dispatch(setLoading(false));
    } catch (err: unknown) {
      dispatch(setError(err?.toString()));
    }
  };

  const handleSendQuery = async () => {
    try {
      const parsedVariables = parseVariables(variables);
      const parsedHeaders = parseVariables(headers);

      console.log(parsedHeaders);

      if (parsedVariables === null) {
        //TODO show error
        return;
      }

      const responseData = await sendQuery({
        apiUrl,
        query: code,
        variables: parsedVariables,
        headers: parsedHeaders,
      });
      if ('data' in responseData) {
        setResponse(JSON.stringify(responseData.data, null, 2));
      } else if ('data' in responseData.error) {
        setResponse(JSON.stringify(responseData.error.data, null, 2));
      } else {
        console.error('Unexpected response:', responseData);
      }
    } catch (err) {
      console.error(err);
      //TODO show error
    }
    console.log({ apiUrl, code, variables });
  };

  const handleChangeEditor = (code: string) => {
    setCode(code);
    // console.log(code);
  };

  const handleChangeVariables = (code: string) => {
    setVariables(code);
    // console.log(code);
  };

  const handleChangeHeaders = (code: string) => {
    setHeaders(code);
    // console.log(code);
  };

  return (
    <div className={styles.root}>
      <div className={styles.input}>
        <Container>
          <InputEndpoint onSubmit={handleApiSubmit} initialValue={apiUrl} />
          {error && <div>Error loading schema: {error.toString()}</div>}
        </Container>
      </div>
      <SideBar />
      <div className={styles.container}>
        <div className={styles.col} style={{ width: `${editorWidth}px` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="outlined" onClick={() => handlePrettifyCode(code, setCode)}>
              prettify
            </Button>
            <Button variant="outlined" onClick={handleSendQuery}>
              Send query
            </Button>
          </Box>

          <div className={styles.editor} style={{ height: `${editorHeight}px` }}>
            <CodeEditor initialValue={`${code}`} onChange={handleChangeEditor} />
          </div>
          <ResizableDivider direction="horizontal" onResize={handleResizeHeight} />
          <div className={styles.tabs} style={{ height: `${tabsHeight}px` }}>
            <EditorTabs
              initialVariables={`${variables}`}
              initialHeaders={`${headers}`}
              onChangeVariables={handleChangeVariables}
              onChangeHeaders={handleChangeHeaders}
            />
          </div>
        </div>
        <ResizableDivider direction="vertical" onResize={handleResizeWidth} />
        <div className={styles.col} style={{ width: `${responseWidth}px` }}>
          <CodeEditor initialValue={`${response}`} readOnly={true} />
        </div>
      </div>
    </div>
  );
};

export default Main;
