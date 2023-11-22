import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage.tsx';
import { OrderPage } from '../pages/OrderPage.tsx';
import { ErrorPage } from '../pages/ErrorPage.tsx';
import { MainLayout } from '../layouts/MainLayout.tsx';

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
