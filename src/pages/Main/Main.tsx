import React, { lazy, Suspense, useReducer } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
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
import { useLocale } from '@/contexts/Locale/LocaleProvider';
import { InputEndpoint } from '@/components/InputEndpoint';
import { CodeEditor } from '@/components/CodeEditor';
import { EditorTabs } from '@/components/EditorTabs';
import { ResizableDivider } from '@/components/ResizableDivider';
import { Loader } from '@/components/Loader';
import { mainReducer, initialState, MainState, MainAction } from './MainReducer';
import styles from './Main.module.scss';

const SideBar = lazy(async () => ({
  default: (await import('@/components/SideBar')).SideBar,
}));

const InputEndpointMemo = React.memo(InputEndpoint);
const CodeEditorMemo = React.memo(CodeEditor);
const EditorTabsMemo = React.memo(EditorTabs);

const Main: React.FC = () => {
  const { editorHeightPercent, tabsHeightPercent, handleResizeHeight } = useResizableHeight();
  const { editorWidthPercent, responseWidthPercent, handleResizeWidth } = useResizableWidth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [state, mainDispatch] = useReducer<React.Reducer<MainState, MainAction>>(
    mainReducer,
    initialState
  );
  const { apiUrl, code, variables, headers, response } = state;

  const { state: localeState } = useLocale();
  const { strings } = localeState;

  const dispatch = useAppDispatch();
  const [sendQuery] = useSendQueryMutation();
  const [fetchSchema, { isLoading }] = useLazyFetchSchemaQuery();

  const isSchemaLoading = isLoading;

  const handleSchemaRequest = async () => {
    try {
      const schemaData = await fetchSchema(apiUrl).unwrap();
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

  const handleApiSubmit = async (newApiUrl: string) => {
    mainDispatch({ type: 'SET_API_URL', payload: newApiUrl });
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
          dispatch(setError('responseError'));
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
            onSchemaRequest={handleSchemaRequest}
            onClear={handleClearUrl}
          />
        </Container>
      </div>
      <Suspense fallback={<Loader />}>{!isSchemaLoading && <SideBar />}</Suspense>
      <div className={styles.container}>
        <div
          className={styles.col}
          style={!isSmallScreen ? { width: `${editorWidthPercent}%` } : {}}
        >
          <div
            data-testid="editor"
            className={styles.editor}
            style={!isSmallScreen ? { height: `${editorHeightPercent}%` } : {}}
          >
            <h3 className={styles.title}>{strings.titleEditor}</h3>
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
              aria-label="Send"
            >
              <SendIcon name="send" />
            </Button>

            <CodeEditorMemo initialValue={`${code}`} onChange={handleChangeEditor} />
          </div>
          {!isSmallScreen && (
            <ResizableDivider
              direction="horizontal"
              onResize={(deltaY: number, containerHeight: number) =>
                handleResizeHeight(deltaY, containerHeight)
              }
            />
          )}
          <div
            className={styles.tabs}
            style={!isSmallScreen ? { height: `${tabsHeightPercent}%` } : {}}
          >
            <EditorTabsMemo
              initialVariables={`${variables}`}
              initialHeaders={`${headers}`}
              onChangeVariables={handleChangeVariables}
              onChangeHeaders={handleChangeHeaders}
            />
          </div>
        </div>
        {!isSmallScreen && (
          <ResizableDivider
            direction="vertical"
            onResize={(deltaX: number, containerWidth: number) =>
              handleResizeWidth(deltaX, containerWidth)
            }
          />
        )}
        <div
          className={styles.col}
          style={
            !isSmallScreen
              ? { width: `${responseWidthPercent}%` }
              : { height: '300px', marginBottom: '20px' }
          }
        >
          <h3 className={styles.title}>{strings.titleResponse}</h3>
          <CodeEditorMemo initialValue={`${response}`} readOnly={true} data-testid="response" />
        </div>
      </div>
    </div>
  );
};

export default Main;
