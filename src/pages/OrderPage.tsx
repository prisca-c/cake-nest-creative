import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { NameContext } from '../context/NameContext.ts';

export const OrderPage = () => {
  const navigate = useNavigate();
  const { name } = useContext(NameContext);

  useEffect(() => {
    if (name === '') {
      navigate('/');
    }
  });

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Bonjour {name} !</h1>
      <button onClick={goToHomePage}>Déconnexion</button>
    </div>
  );
};
