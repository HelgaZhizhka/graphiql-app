import { Editor } from '@monaco-editor/react';
import { useTheme } from '@mui/material';

type Props = {
  initialValue: string;
  onChange?(value: string): void;
  readOnly?: boolean;
};

const CodeEditor: React.FC<Props> = ({ initialValue, onChange, readOnly = false }) => {
  const theme = useTheme();
  const handleChange = (value: string) => {
    onChange && onChange(value);
  };

  const themeEditor = theme.palette.mode === 'dark' ? 'vs-dark' : 'vs-light';

  return (
    <Editor
      language="graphql"
      theme={themeEditor}
      value={initialValue}
      onChange={(code) => handleChange(code as string)}
      options={{
        fontSize: 16,
        readOnly: readOnly,
      }}
    />
  );
};

export default CodeEditor;
