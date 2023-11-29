import React, { useCallback, useContext, useState } from 'react';
import { UserContext } from '@Context/UserContext.ts';
import { useNavigate } from 'react-router-dom';
import { ApiUsersFirebase } from '~@/services/Firebase/ApiUsersFirebase.ts';
import { fakeMenu2 } from '~@/data/fakeMenu.ts';

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
    } else {
      setUser({
        id: crypto.randomUUID(),
        username: newName,
        isAdmin: false,
        menu: fakeMenu2,
        cart: {
          id: '',
          products: [],
        },
      });
      const user = await ApiUsersFirebase.checkIfUsernameExists(newName);
      //console.log('before if', user);
      if (user) {
        //console.log('user exists');
        localStorage.setItem('user', JSON.stringify(user));
        return navigate('/order');
      } else {
        //console.log('user does not exist');
        const userInfo = {
          id: crypto.randomUUID(),
          username: newName,
          isAdmin: false,
          menu: fakeMenu2,
          cart: {
            id: '',
            products: [],
          },
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
