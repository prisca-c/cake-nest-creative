import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div>
      <h1>Error Page</h1>
      <Link to={'/'}>Retourner à la page d'accueil</Link>
    </div>
  );
};
