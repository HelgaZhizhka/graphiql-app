import { lazy } from 'react';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Loader } from '@/components/Loader';
import { AuthHandler } from '@/components/AuthHandler';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RoutePaths } from './routes.enum';
import ProtectedRoute from './ProtectedRoute';

const Home = lazy(async () => ({
  default: (await import('@/pages/Home')).Home,
}));
const Main = lazy(async () => ({
  default: (await import('@/pages/Main')).Main,
}));
const SignIn = lazy(async () => ({
  default: (await import('@/pages/SignIn')).SignIn,
}));
const SignUp = lazy(async () => ({
  default: (await import('@/pages/SignUp')).SignUp,
}));
const ForgotPassword = lazy(async () => ({
  default: (await import('@/pages/ForgotPassword')).ForgotPassword,
}));

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
        element: (
          <AuthHandler>
            <SignIn />
          </AuthHandler>
        ),
      },
      {
        path: RoutePaths.SIGN_UP,
        element: (
          <AuthHandler>
            <SignUp />
          </AuthHandler>
        ),
      },
      {
        path: RoutePaths.FORGOT_PASSWORD,
        element: (
          <AuthHandler>
            <ForgotPassword />
          </AuthHandler>
        ),
      },
      {
        path: RoutePaths.ERROR,
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const Routes = () => (
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>
);

export default Routes;
