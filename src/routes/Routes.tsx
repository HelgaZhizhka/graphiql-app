import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Main } from '@/pages/Main';
import { SignIn } from '@/pages/SignIn';
import { SignUp } from '@/pages/SignUp';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { RoutePaths } from './routes.enum';
import ProtectedRoute from './ProtectedRoute';

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
        element: (
          <ProtectedRoute redirectTo={RoutePaths.WELCOME}>
            <Main />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePaths.SIGN_IN,
        element: <SignIn />,
      },
      {
        path: RoutePaths.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: RoutePaths.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
