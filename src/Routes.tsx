import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './ui/pages/LoginPage.tsx';
import { OrderPage } from './ui/pages/OrderPage.tsx';
import { ErrorPage } from './ui/pages/ErrorPage.tsx';
import { MainLayout } from './ui/layouts/MainLayout.tsx';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path="/order" element={<OrderPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default MainRoutes;
