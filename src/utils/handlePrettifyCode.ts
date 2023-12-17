export const handlePrettifyCode = (
  code: string,
  setCode: React.Dispatch<React.SetStateAction<string>>
) => {
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
    } else if (el.trim().split(' ').length >= 2) {
      const moreWords = el.trim().split(' ');
      moreWords.forEach((value, index) => {
        if (moreWords.length - 1 === index) {
          result += `${'  '.repeat(deep) + value} `;
        } else if (value.includes(':')) {
          const nextWord = moreWords[index + 1];
          if (nextWord && !nextWord.includes(':')) {
            result += `${'  '.repeat(deep) + value}`;
          } else {
            result += `${'  '.repeat(deep) + value}\n`;
          }
        } else {
          result += `${'  '.repeat(deep) + value}\n`;
        }
      });
    } else {
      result += ' '.repeat(deep) + el;
    }
  }
  result = result.replace(/}\n\s*\n/g, '}\n').replace(/:\s+/g, ': ');

  setCode(result);
};
