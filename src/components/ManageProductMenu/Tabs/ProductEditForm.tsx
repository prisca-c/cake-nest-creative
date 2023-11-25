import React from 'react';
import { FaCamera } from 'react-icons/fa';
import { GiCupcake } from 'react-icons/gi';
import { MdEuro } from 'react-icons/md';
import styled from 'styled-components';
import type { ManageProductType } from '@Types/ManageProductType.ts';

import { theme } from '~@/theme';
import { useEditProductForm } from '@Hooks/form/useEditProductForm.ts';

type ProductAddFormProps = {
  data: ManageProductType;
  setData: React.Dispatch<React.SetStateAction<ManageProductType>>;
};

export const ProductEditForm = ({ data, setData }: ProductAddFormProps) => {
  const { handleChange } = useEditProductForm({ data, setData });

  return (
    <Main>
      <div className={'input-group'}>
        <GiCupcake color={theme.colors.greyDark} size={20} />
        <input
          type="text"
          placeholder="Nom du produit"
          onChange={handleChange}
          value={data.name}
          id="name"
        />
      </div>
      <div className={'input-group'}>
        <FaCamera color={theme.colors.greyDark} size={20} />
        <input
          type="text"
          placeholder="Lien URL de l'image (ex: https://mon-url.me/mon-produit.png)"
          onChange={handleChange}
          value={data.image}
          id="image"
        />
      </div>
      <div className={'input-group'}>
        <MdEuro color={theme.colors.greyDark} size={20} />
        <input
          type="number"
          placeholder="Prix du produit"
          onChange={handleChange}
          value={data.price}
          step="0.01"
          id="price"
        />
      </div>
      <p>Cliquez sur un produit pour le modifier en temps réel</p>
    </Main>
  );
};

const Main = styled.div`
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

  p {
    color: ${theme.colors.success};
    font-size: 14px;
  }
`;
