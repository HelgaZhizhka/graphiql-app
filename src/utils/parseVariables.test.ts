import { parseVariables } from './parseVariables';

describe('parseVariables', () => {
  it('parses JSON strings correctly', () => {
    const json = '{"key": "value"}';
    expect(parseVariables(json)).toEqual({ key: 'value' });
  });

  it('returns an empty object for empty strings', () => {
    expect(parseVariables('')).toEqual({});
  });

  it('returns null for invalid JSON strings', () => {
    const invalidJson = '{key: value}';
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(parseVariables(invalidJson)).toBeNull();

    consoleSpy.mockRestore();
  });
});
