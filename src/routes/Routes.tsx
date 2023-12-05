import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { RoutePaths } from './routes.enum';

import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Main } from '@/pages/Main';
import { SignIn } from '@/pages/SignIn';
import { SignUp } from '@/pages/SignUp';

const routes = [
  {
    path: RoutePaths.WELCOME,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: RoutePaths.WELCOME,
        element: <Home />,
      },
      {
        path: RoutePaths.MAIN,
        element: <Main />,
      },
      {
        path: RoutePaths.SIGNIN,
        element: <SignIn />,
      },
      {
        path: RoutePaths.SIGNUP,
        element: <SignUp />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
