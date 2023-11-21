import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage.tsx';
import { OrderPage } from '../pages/OrderPage.tsx';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default MainRoutes;
