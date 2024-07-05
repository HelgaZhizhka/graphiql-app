import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MessageSnackbar } from '@/components/MessageSnackbar';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const Layout: React.FC = () => (
  <main className="app">
    <MessageSnackbar />
    <Header />
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
    <Footer />
  </main>
);

export default Layout;
