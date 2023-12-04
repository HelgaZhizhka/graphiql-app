import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { RoutePaths } from './routes.enum';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { NotFoundPage } from '@/pages/NotFoundPage';

const routes = [
  {
    path: RoutePaths.HOME,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: RoutePaths.HOME,
        element: <Home />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
