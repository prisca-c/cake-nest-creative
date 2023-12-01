import { useLoginForm } from '@Hooks/form/useLoginForm.ts';
import styled from 'styled-components';
import { Button } from '../Button.tsx';
import { LoginFormInput } from './LoginFormInput.tsx';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';

export const LoginForm = () => {
  const { handleLogin, handleNameOnChange, newName } = useLoginForm();

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
