import React, { lazy, Suspense, useReducer } from 'react';
import { IntrospectionQuery } from 'graphql';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';

import { useAppDispatch, useResizableHeight, useResizableWidth } from '@/hooks';
import { parseVariables } from '@/utils/parseVariables';
import { handlePrettifyCode } from '@/utils/handlePrettifyCode';
import { Writable } from '@/utils/types';
import { FetchError } from '@/utils/interfaces';
import { setError } from '@/store/slices/messageSlice';
import { useLazyFetchSchemaQuery, useSendQueryMutation } from '@/store/api/apiService';
import { setSchema, clearSchema } from '@/store/slices/schemaSlice';
import { InputEndpoint } from '@/components/InputEndpoint';
import { CodeEditor } from '@/components/CodeEditor';
import { EditorTabs } from '@/components/EditorTabs';
import { ResizableDivider } from '@/components/ResizableDivider';
import { mainReducer, initialState, MainState, MainAction } from './MainReducer';
import styles from './Main.module.scss';

const SideBar = lazy(async () => ({
  default: (await import('@/components/SideBar')).SideBar,
}));

const InputEndpointMemo = React.memo(InputEndpoint);
const CodeEditorMemo = React.memo(CodeEditor);
const EditorTabsMemo = React.memo(EditorTabs);

const Main: React.FC = () => {
  const { editorHeight, tabsHeight, handleResizeHeight } = useResizableHeight(300, 50, 50, 400);
  const { editorWidth, responseWidth, handleResizeWidth } = useResizableWidth(
    window.innerWidth / 2,
    window.innerWidth / 2,
    50,
    window.innerWidth - 150
  );
  const [state, mainDispatch] = useReducer<React.Reducer<MainState, MainAction>>(
    mainReducer,
    initialState
  );
  const { apiUrl, code, variables, headers, response } = state;

  const dispatch = useAppDispatch();
  const [sendQuery] = useSendQueryMutation();
  const [fetchSchema, { isLoading }] = useLazyFetchSchemaQuery();

  const isSchemaLoading = isLoading || !apiUrl;

  const handleApiSubmit = async (newApiUrl: string) => {
    mainDispatch({ type: 'SET_API_URL', payload: newApiUrl });
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
      mainDispatch({ type: 'RESET_DATA' });
      dispatch(clearSchema());
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
        const response = JSON.stringify(responseData.data, null, 2);
        mainDispatch({ type: 'SET_RESPONSE', payload: response });
      } else if ('data' in responseData.error) {
        if (!responseData.error.data) {
          dispatch(setError('fetchQuery'));
        } else {
          const error = JSON.stringify(responseData.error.data, null, 2);
          mainDispatch({ type: 'SET_RESPONSE', payload: error });
        }
      } else {
        console.error('Unexpected response:', responseData);
      }
    } catch (err) {
      dispatch(setError('fetchQuery'));
      console.error(err);
      mainDispatch({ type: 'RESET_DATA' });
      dispatch(clearSchema());
    }
  };

  const handleClearUrl = () => {
    mainDispatch({ type: 'SET_API_URL', payload: '' });
    mainDispatch({ type: 'RESET_DATA' });
    dispatch(clearSchema());
  };

  const handleChangeEditor = (code: string) => {
    mainDispatch({ type: 'SET_CODE', payload: code });
  };

  const handleChangeVariables = (code: string) => {
    mainDispatch({ type: 'SET_VARIABLES', payload: code });
  };

  const handleChangeHeaders = (code: string) => {
    mainDispatch({ type: 'SET_HEADERS', payload: code });
  };

  return (
    <div className={styles.root}>
      <div className={styles.input}>
        <Container>
          <InputEndpointMemo
            initialValue={apiUrl}
            onSubmit={handleApiSubmit}
            onClear={handleClearUrl}
          />
        </Container>
      </div>
      <Suspense fallback={<div>Schema is coming soon...</div>}>
        {!isSchemaLoading && <SideBar />}
      </Suspense>
      <div className={styles.container}>
        <div className={styles.col} style={{ width: `${editorWidth}px` }}>
          <div className={styles.editor} style={{ height: `${editorHeight}px` }}>
            <Button
              className={styles.btnPretty}
              variant="outlined"
              onClick={() => handlePrettifyCode(code, mainDispatch)}
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

            <CodeEditorMemo initialValue={`${code}`} onChange={handleChangeEditor} />
          </div>
          <ResizableDivider direction="horizontal" onResize={handleResizeHeight} />
          <div className={styles.tabs} style={{ height: `${tabsHeight}px` }}>
            <EditorTabsMemo
              initialVariables={`${variables}`}
              initialHeaders={`${headers}`}
              onChangeVariables={handleChangeVariables}
              onChangeHeaders={handleChangeHeaders}
            />
          </div>
        </div>
        <ResizableDivider direction="vertical" onResize={handleResizeWidth} />
        <div className={styles.col} style={{ width: `${responseWidth}px` }}>
          <CodeEditorMemo initialValue={`${response}`} readOnly={true} />
        </div>
      </div>
    </div>
  );
};

export default Main;
