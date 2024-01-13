export const mockApiUrl = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

export const mockUser = {
  uid: '123456',
  email: 'user@example.com',
  displayName: 'Test User',
};

export const mockQueryData = {
  data: {
    allFilms: {
      films: [
        {
          title: "A New Hope"
        },
        {
          title: "The Empire Strikes Back"
        },
        {
          title: "Return of the Jedi"
        },
        {
          title: "The Phantom Menace"
        },
        {
          title: "Attack of the Clones"
        },
        {
          title: "Revenge of the Sith"
        }
      ]
    }
  }
}