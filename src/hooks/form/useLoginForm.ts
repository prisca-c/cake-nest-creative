import React, { useCallback, useContext, useState } from 'react';
import { UserContext } from '@Context/UserContext.ts';
import { useNavigate } from 'react-router-dom';
import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { initialUserState } from '@Types/UserType.ts';

export const useLoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const handleNameOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewName(event.target.value);
    },
    [],
  );

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newName === '') {
      alert('Veuillez entrer un prénom');
      return;
    } else {
      setUser(initialUserState);
      const user = await ApiUsersFirebase.checkIfUsernameExists(newName);
      //console.log('before if', user);
      if (user) {
        //console.log('user exists');
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));
        return navigate('/order');
      } else {
        //console.log('user does not exist');
        const userInfo = {
          ...initialUserState,
          username: newName,
        };
        await ApiUsersFirebase.createUser(userInfo).then(() => {
          //console.log('user created');
          localStorage.setItem('user', JSON.stringify(userInfo));
          return navigate('/order');
        });
      }
    }
  };

  return {
    handleNameOnChange,
    handleLogin,
    newName,
  };
};
