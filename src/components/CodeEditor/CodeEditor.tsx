import { useEffect } from 'react';
import { Editor, useMonaco } from '@monaco-editor/react';
import { useTheme } from '@mui/material';

type Props = {
  initialValue: string;
  onChange?(value: string): void;
  readOnly?: boolean;
};

const CodeEditor: React.FC<Props> = ({ initialValue, onChange, readOnly = false }) => {
  const theme = useTheme();
  const monaco = useMonaco();
  const handleChange = (value: string) => {
    onChange && onChange(value);
  };

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('customTheme', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
          'editorGutter.background': '#f5f5f5',
          'editor.background': '#f6f8fa',
        },
      });
    }
  }, [monaco]);

  const themeEditor = theme.palette.mode === 'dark' ? 'vs-dark' : 'customTheme';

  return (
    <Editor
      language="graphql"
      theme={themeEditor}
      value={initialValue}
      onChange={(code) => handleChange(code as string)}
      options={{
        fontSize: 16,
        readOnly: readOnly,
        minimap: { enabled: false },
      }}
    />
  );
};

export default CodeEditor;
