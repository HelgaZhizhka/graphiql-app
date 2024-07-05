import messageSlice, { setMessage, setError, setSuccess, clearMessage } from './messageSlice';
import { getLang } from '@/contexts/Locale/constants';

jest.mock('@/contexts/Locale/constants', () => ({
  getLang: jest.fn(),
}));

describe('messageSlice', () => {
  beforeEach(() => {
    (getLang as jest.Mock).mockReturnValue('RU');
  });

  it('should handle initial state', () => {
    expect(messageSlice(undefined, { type: 'unknown' })).toEqual({
      message: '',
      messageType: 'info',
    });
  });

  it('should handle setMessage', () => {
    const actual = messageSlice(
      { message: '', messageType: 'info' },
      setMessage({ text: 'Test message', type: 'warning' })
    );
    expect(actual.message).toEqual('Test message');
    expect(actual.messageType).toEqual('warning');
  });

  it('should handle setError', () => {
    const actual = messageSlice(
      { message: '', messageType: 'info' },
      setError('auth/invalid-email')
    );
    expect(actual.message).toEqual('Неверный адрес электронной почты.');
    expect(actual.messageType).toEqual('error');
  });

  it('should handle setSuccess', () => {
    const actual = messageSlice({ message: '', messageType: 'info' }, setSuccess('login'));
    expect(actual.message).toEqual('Вход выполнен успешно. Добро пожаловать!');
    expect(actual.messageType).toEqual('success');
  });

  it('should handle clearMessage', () => {
    const actual = messageSlice(
      { message: 'Test message', messageType: 'warning' },
      clearMessage()
    );
    expect(actual.message).toEqual('');
    expect(actual.messageType).toEqual('info');
  });
});
