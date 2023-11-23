import React from 'react';
import styled from 'styled-components';

type LoginFormInputProps = {
  name: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LoginFormInput = ({
  name,
  handleOnChange,
}: LoginFormInputProps) => {
  return (
    <Input
      type="text"
      placeholder="Entrez votre prénom ..."
      id="name"
      onChange={handleOnChange}
      value={name}
    />
  );
};

const Input = styled.input`
  border: none;
  cursor: pointer;
  width: 80%;
`;
