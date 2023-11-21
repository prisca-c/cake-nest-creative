import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage.tsx';
import { OrderPage } from '../pages/OrderPage.tsx';
import { ErrorPage } from '../pages/ErrorPage.tsx';
import { NameContext } from '../context/NameContext.ts';
import { useState } from 'react';

const MainRoutes = () => {
  const [name, setName] = useState('');
  return (
    <NameContext.Provider value={{ name, setName }}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </NameContext.Provider>
  );
};

export default MainRoutes;
