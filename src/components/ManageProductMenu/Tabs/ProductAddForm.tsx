import styled from 'styled-components';
import { theme } from '../../../theme';
import { GiCupcake } from 'react-icons/gi';
import { FaCamera } from 'react-icons/fa';
import { MdEuro } from 'react-icons/md';
import React, { useState } from 'react';
import { ManageProductType } from '@Types/ManageProductType.ts';
import { FiCheckCircle } from 'react-icons/fi';
import { useTimer } from '../../../hooks/useTimer.ts';

type ProductAddFormProps = {
  data: ManageProductType;
  setData: React.Dispatch<React.SetStateAction<ManageProductType>>;
};

export const ProductAddForm = ({ data, setData }: ProductAddFormProps) => {
  const [newData, setNewData] = useState<ManageProductType>({
    name: '',
    image: '',
    price: 0.0,
  });
  const { timerState, setTimerState } = useTimer({
    time: 2000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewData({
      ...newData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO Error handling

    setData(newData);

    if (data) {
      setTimerState(true);

      setNewData({
        name: '',
        image: '',
        price: 0,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={'input-group'}>
        <GiCupcake color={theme.colors.greyDark} size={20} />
        <input
          type="text"
          placeholder="Nom du produit"
          onChange={handleChange}
          value={newData.name}
          id="name"
        />
      </div>
      <div className={'input-group'}>
        <FaCamera color={theme.colors.greyDark} size={20} />
        <input
          type="text"
          placeholder="Lien URL de l'image (ex: https://mon-url.me/mon-produit.png)"
          onChange={handleChange}
          value={newData.image}
          id="image"
        />
      </div>
      <div className={'input-group'}>
        <MdEuro color={theme.colors.greyDark} size={20} />
        <input
          type="number"
          placeholder="Prix du produit"
          onChange={handleChange}
          value={newData.price}
          step="0.01"
          id="price"
        />
      </div>
      <div className={'add-group'}>
        <button type={'submit'}>Ajouter un nouveau produit au menu</button>
        {timerState && (
          <p>
            <FiCheckCircle color={theme.colors.success} size={20} /> Produit
            ajouté avec succès !
          </p>
        )}
      </div>
    </Form>
  );
};

const Form = styled.form`
  .input-group {
    display: flex;
    align-items: center;
    border-radius: ${theme.borderRadius.round};
    background-color: ${theme.colors.greyLight};
    padding: 10px 20px;
    margin-bottom: 10px;

    input {
      border: none;
      outline: none;
      font-size: 16px;
      margin-left: 10px;
      background-color: ${theme.colors.greyLight};
      width: 100%;
    }
  }

  .add-group {
    display: flex;
    gap: 10px;
    align-items: center;

    button {
      border: none;
      background-color: ${theme.colors.success};
      color: ${theme.colors.white};
      font-size: 16px;
      padding: 10px 20px;
      border-radius: ${theme.borderRadius.round};
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: ${theme.colors.white};
        color: ${theme.colors.success};
        outline: 1px solid ${theme.colors.success};
      }
    }

    p {
      display: flex;
      align-items: center;
      gap: 10px;
      color: ${theme.colors.success};
    }
  }
`;
