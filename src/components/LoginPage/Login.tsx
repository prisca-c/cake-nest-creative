import React, { useState } from 'react';

export const Login = () => {
  const [name, setName] = useState<string>('');

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

    alert(`Bienvenue ${name} !`);
    setName('');
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
