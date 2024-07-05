import { mockApiUrl, mockQueryData } from '@/__tests__/mockData';

describe('api graphql', () => {
  it('receives a mocked response to a GraphQL API request', async () => {
    const response = await fetch(mockApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query {
          allFilms {
            films {
              title
            }
          }
        }
      `,
      }),
    });

    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(await response.json()).toEqual(mockQueryData);
  });
});
