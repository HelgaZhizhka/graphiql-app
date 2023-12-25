import { http, HttpResponse } from 'msw';

import { mockApiUrl } from './mockData';

export const handlers = [
  http.post(mockApiUrl, () => {
     return HttpResponse.json();
  }),
]