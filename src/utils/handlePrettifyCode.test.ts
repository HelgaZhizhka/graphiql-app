import { handlePrettifyCode } from './handlePrettifyCode';

describe('handlePrettifyCode', () => {
  it('formats code correctly', () => {
    const code = 'query { allFilms { films { title } } }';
    const dispatch = jest.fn();
    const expected = `query {
  allFilms {
   films {
    title     
    }
  }
}
`;
    handlePrettifyCode(code, dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'PRETTIFY_CODE', payload: expected });
  });
});
