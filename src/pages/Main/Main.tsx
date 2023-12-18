import { useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';

import { useAppDispatch, useResizableHeight, useResizableWidth } from '@/hooks';
import { parseVariables } from '@/utils/parseVariables';
import { handlePrettifyCode } from '@/utils/handlePrettifyCode';
import { setError } from '@/store/slices/messageSlice';
import { useLazyFetchSchemaQuery, useSendQueryMutation } from '@/store/api/apiService';
import { setSchema } from '@/store/slices/schemaSlice';
import { SideBar } from '@/components/SideBar';
import { InputEndpoint } from '@/components/InputEndpoint';
import { CodeEditor } from '@/components/CodeEditor';
import { EditorTabs } from '@/components/EditorTabs';
import { ResizableDivider } from '@/components/ResizableDivider';
import styles from './Main.module.scss';

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
  const [fetchSchema] = useLazyFetchSchemaQuery();

  const handleApiSubmit = async (newApiUrl: string) => {
    setApiUrl(newApiUrl);
    try {
      const schemaData = await fetchSchema(newApiUrl).unwrap();
      dispatch(setSchema(schemaData));
    } catch (err: unknown) {
      dispatch(setError('fetchSchema'));
      console.error(err);
    }
  };

  const handleSendQuery = async () => {
    try {
      const parsedVariables = parseVariables(variables);
      const parsedHeaders = parseVariables(headers);

      if (parsedVariables === null) {
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
    }
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
          <InputEndpoint onSubmit={handleApiSubmit} initialValue={apiUrl} />
        </Container>
      </div>
      <SideBar />
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
