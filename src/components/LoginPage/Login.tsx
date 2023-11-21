import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NameContext } from '../../context/NameContext.ts';

export const Login = () => {
  const { name, setName } = useContext(NameContext);
  const navigate = useNavigate();

  const handleNameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    setName(inputName);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.querySelector('input')!.value;
    if (name === '') {
      alert('Veuillez entrer un prénom');
      return;
    }

    setName(name);
    navigate('/order');
  };

  return (
    <div>
      <h2>Connectez-vous</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Entrez votre prénom ..."
          id="name"
          value={name}
          onChange={handleNameOnChange}
        />
        <button>Accéder à votre espace</button>
      </form>
    </div>
  );
};
