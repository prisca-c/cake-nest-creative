import { IoPersonCircleOutline } from 'react-icons/io5';
import { Button } from '../Button.tsx';
import { IoIosArrowForward } from 'react-icons/io';
import React from 'react';
import styled from 'styled-components';

type LoginFormProps = {
  name: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const LoginForm = ({
  name,
  handleOnChange,
  handleLogin,
}: LoginFormProps) => {
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: clamp(200px, 50%, 500px);
  `;

  const DivInput = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px 15px;
  `;

  const Input = styled.input`
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    place-items: center;
    gap: 10px;
    width: 100%;
  `;

  return (
    <Form onSubmit={handleLogin}>
      <DivInput>
        <IoPersonCircleOutline size={30} color={'#2d2d2d'} />
        <Input
          type="text"
          placeholder="Entrez votre prénom ..."
          id="name"
          value={name}
          onChange={handleOnChange}
        />
      </DivInput>
      <Button variant={'primary'}>
        Mon espace <IoIosArrowForward />
      </Button>
    </Form>
  );
};
