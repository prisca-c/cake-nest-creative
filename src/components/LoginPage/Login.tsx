import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NameContext } from '../../context/NameContext.ts';
import styled from 'styled-components';
import { DivCenter } from '../DivCenter.tsx';
import { LoginForm } from './LoginForm.tsx';

export const Login = () => {
  const { setName } = useContext(NameContext);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const handleNameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    setNewName(inputName);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.querySelector('input')!.value;
    if (name === '') {
      alert('Veuillez entrer un prénom');
      return;
    }

    setName(newName);
    navigate('/order');
  };

  const H2 = styled.h2`
    color: #fff;
    text-align: center;
  `;

  return (
    <DivCenter>
      <H2>Connectez-vous</H2>
      <LoginForm
        name={newName}
        handleOnChange={handleNameOnChange}
        handleLogin={handleLogin}
      />
    </DivCenter>
  );
};
