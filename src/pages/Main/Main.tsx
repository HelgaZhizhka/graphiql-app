import { useState } from 'react';
import { IntrospectionQuery } from 'graphql';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';

import { useAppDispatch, useResizableHeight, useResizableWidth } from '@/hooks';
import { parseVariables } from '@/utils/parseVariables';
import { handlePrettifyCode } from '@/utils/handlePrettifyCode';
import { Writable } from '@/utils/types';
import { setError } from '@/store/slices/messageSlice';
import { useLazyFetchSchemaQuery, useSendQueryMutation } from '@/store/api/apiService';
import { setSchema, clearSchema } from '@/store/slices/schemaSlice';
import { SideBar } from '@/components/SideBar';
import { InputEndpoint } from '@/components/InputEndpoint';
import { CodeEditor } from '@/components/CodeEditor';
import { EditorTabs } from '@/components/EditorTabs';
import { ResizableDivider } from '@/components/ResizableDivider';
import styles from './Main.module.scss';
import { FetchError } from '@/utils/interfaces';

const Main: React.FC = () => {
  const { editorHeight, tabsHeight, handleResizeHeight } = useResizableHeight(300, 50, 50, 400);
  const { editorWidth, responseWidth, handleResizeWidth } = useResizableWidth(
    window.innerWidth / 2,
    window.innerWidth / 2,
    50,
    window.innerWidth - 150
  );
  const [apiUrl, setApiUrl] = useState('');
  const [code, setCode] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [response, setResponse] = useState('');
  const dispatch = useAppDispatch();
  const [sendQuery] = useSendQueryMutation();
  const [fetchSchema, { isLoading }] = useLazyFetchSchemaQuery();

  const resetData = () => {
    setCode('');
    setVariables('');
    setHeaders('');
    setResponse('');
    dispatch(clearSchema());
  };

  const isSchemaLoading = isLoading || !apiUrl;

  const handleApiSubmit = async (newApiUrl: string) => {
    setApiUrl(newApiUrl);
    try {
      const schemaData = await fetchSchema(newApiUrl).unwrap();
      dispatch(setSchema(schemaData as Writable<IntrospectionQuery>));
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'error' in err) {
        const fetchError = err as FetchError;
        if (fetchError.error === 'TypeError: Failed to fetch') {
          dispatch(setError('fetchCORS'));
        } else {
          dispatch(setError('fetchSchema'));
        }
      }
      resetData();
      console.error(err);
    }
  };

  const handleSendQuery = async () => {
    try {
      const parsedVariables = parseVariables(variables);
      const parsedHeaders = parseVariables(headers);

      if (parsedVariables === null || parsedHeaders === null) {
        dispatch(setError('parsingError'));
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
        if (!responseData.error.data) {
          dispatch(setError('fetchQuery'));
        } else {
          setResponse(JSON.stringify(responseData.error.data, null, 2));
        }
      } else {
        console.error('Unexpected response:', responseData);
      }
    } catch (err) {
      dispatch(setError('fetchQuery'));
      console.error(err);
      resetData();
    }
  };

  const handleClearUrl = () => {
    setApiUrl('');
    resetData();
  };

  const handleChangeEditor = (code: string) => {
    setCode(code);
  };

  const handleChangeVariables = (code: string) => {
    setVariables(code);
  };

  const handleChangeHeaders = (code: string) => {
    setHeaders(code);
  };

  return (
    <div className={styles.root}>
      <div className={styles.input}>
        <Container>
          <InputEndpoint
            initialValue={apiUrl}
            onSubmit={handleApiSubmit}
            onClear={handleClearUrl}
          />
        </Container>
      </div>
      <SideBar isLoading={isSchemaLoading} />
      <div className={styles.container}>
        <div className={styles.col} style={{ width: `${editorWidth}px` }}>
          <div className={styles.editor} style={{ height: `${editorHeight}px` }}>
            <Button
              className={styles.btnPretty}
              variant="outlined"
              onClick={() => handlePrettifyCode(code, setCode)}
              disabled={!code}
            >
              <CodeIcon />
            </Button>
            <Button
              className={styles.btnSend}
              variant="outlined"
              onClick={handleSendQuery}
              disabled={!code || !apiUrl}
            >
              <SendIcon />
            </Button>

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
