import { MainAction } from '@/pages/Main/MainReducer';

const isGraphQLOperation = (str: string) =>
  ['mutation', 'query', 'subscription'].some((keyword) => str.includes(keyword));

const indentWithSpaces = (deep: number, value: string) => `${'  '.repeat(deep) + value} `;
const indentWithNewLine = (deep: number, value: string) => `${'  '.repeat(deep) + value}\n`;

export const handlePrettifyCode = (code: string, dispatch: React.Dispatch<MainAction>) => {
  const splitString = code.replace(/\s+/g, ' ').split(/(\{|})/);
  let deep = 0;
  let result = '';

  for (let i = 0; i < splitString.length; i++) {
    const el = splitString[i];

    if (el.includes('{')) {
      result += ''.repeat(deep) + el.replace('{', '{\n');
      deep++;
    } else if (el.includes('}')) {
      deep = Math.max(deep - 1, 0);
      result += '  '.repeat(deep) + el.replace('}', '\n' + '  '.repeat(deep) + '}\n');
    } else if (el.trim().split(' ').length >= 2 || el.includes('(') || el.includes(')')) {
      const tokenizedWords = el.trim().split(' ');
      tokenizedWords.forEach((value, index) => {
        const nextWord = tokenizedWords[index + 1];
        if (tokenizedWords.length - 1 === index) {
          result += indentWithSpaces(deep, value);
        } else if (isGraphQLOperation(value)) {
          nextWord && !isGraphQLOperation(nextWord)
            ? (result += indentWithSpaces(deep, value))
            : (result += indentWithNewLine(deep, value));
        } else if (value.includes(',')) {
          nextWord && !nextWord.includes(',')
            ? (result += indentWithSpaces(deep, value))
            : (result += indentWithNewLine(deep, value));
        } else if (value.includes(':')) {
          nextWord && !nextWord.includes(':')
            ? (result += indentWithSpaces(deep, value))
            : (result += indentWithNewLine(deep, value));
        } else {
          result += indentWithNewLine(deep, value);
        }
      });
    } else {
      result += ' '.repeat(deep) + el;
    }
  }

  result = result
    .replace(/}\n\s*\n/g, '}\n')
    .replace(/:\s+/g, ': ')
    .replace(/(?<=\([^)]*)[ ]{2,}(?=[^()]*\))/g, ' ');
  dispatch({ type: 'PRETTIFY_CODE', payload: result });
};
