import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Error Page</h1>
      <button onClick={goToHomePage}>Retourner à la page d'accueil</button>
    </div>
  );
};
