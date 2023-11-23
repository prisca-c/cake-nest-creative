import React, { useCallback, useContext, useState } from 'react';
import { NameContext } from '@Context/NameContext.ts';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
  const { setName } = useContext(NameContext);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const handleNameOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputName = event.target.value;
      setNewName(inputName);
    },
    [],
  );

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newName === '') {
      alert('Veuillez entrer un prénom');
      return;
    }

    setName(newName);
    navigate('/order');
    document.cookie = `name=${newName}; expires=Thu, ${new Date(
      Date.now() + 1000 * 60 * 10,
    ).toUTCString()};`;
  };

  return {
    handleNameOnChange,
    handleLogin,
    newName,
  };
};
