import { IoPersonCircleOutline } from 'react-icons/io5';
import { Button } from '../Button.tsx';
import { IoIosArrowForward } from 'react-icons/io';
import React, { useContext, useState, useCallback } from 'react';
import styled from 'styled-components';
import { LoginFormInput } from './LoginFormInput.tsx';
import { NameContext } from '../../context/NameContext.ts';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
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

  return (
    <Form onSubmit={handleLogin}>
      <DivInput>
        <IoPersonCircleOutline size={30} color={'#2d2d2d'} />
        <LoginFormInput name={newName} handleOnChange={handleNameOnChange} />
      </DivInput>
      <Button variant={'primary'} width={'100%'}>
        <Text>Mon espace</Text>
        <IoIosArrowForward />
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  place-items: center;
  width: fit-content;
  gap: 1rem;
`;

const DivInput = styled.div`
  display: flex;
  gap: 10px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 15px;
  width: 50vw;
  margin-top: 1.5rem;
`;

const Text = styled.p`
  text-align: center;
  vertical-align: center;
`;
