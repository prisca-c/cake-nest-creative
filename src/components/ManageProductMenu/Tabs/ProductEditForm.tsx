import React, { useEffect, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import { GiCupcake } from 'react-icons/gi';
import { MdEuro } from 'react-icons/md';
import styled from 'styled-components';
import type { ManageProductType } from '@Types/ManageProductType.ts';

import { theme } from '~@/theme';
import { useEditProductForm } from '@Hooks/form/useEditProductForm.ts';
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import { FiPackage } from 'react-icons/fi';

type ProductAddFormProps = {
  data: ManageProductType;
  setData: React.Dispatch<React.SetStateAction<ManageProductType>>;
};

export const ProductEditForm = ({ data, setData }: ProductAddFormProps) => {
  const { handleChange, openState, selectedProduct } = useEditProductForm({
    data,
    setData,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openState) {
      inputRef.current?.focus();
    }
  }, [openState, selectedProduct]);

  const handleQuantity = (type: 'add' | 'remove') => {
    if (type === 'add') {
      setData((prevState) => ({
        ...prevState,
        quantity: prevState.quantity + 1,
      }));
    }

    if (type === 'remove' && data.quantity > 0) {
      setData((prevState) => ({
        ...prevState,
        quantity: prevState.quantity - 1,
      }));
    }
  };

  const stockStatus = () => {
    return data.quantity <= 0;
  };

  return (
    <Main $stockStatus={stockStatus()}>
      <div className={'input-group'}>
        <GiCupcake color={theme.colors.greyDark} size={20} />
        <input
          type="text"
          placeholder="Nom du produit"
          onChange={handleChange}
          value={data.name}
          id="name"
          ref={inputRef}
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
      <div className={'stock'}>
        <div className={'quantity'}>
          <IoMdRemoveCircle
            color={theme.colors.greyDark}
            size={20}
            onClick={() => handleQuantity('remove')}
            className={'icon'}
          />
          <p>{data.quantity}</p>
          <IoMdAddCircle
            color={theme.colors.greyDark}
            size={20}
            onClick={() => handleQuantity('add')}
            className={'icon'}
          />
        </div>

        <div className={'stock_label'}>
          <FiPackage
            color={stockStatus() ? theme.colors.red : theme.colors.success}
            size={20}
          />
          <p>{stockStatus() ? 'En rupture' : 'En stock'}</p>
        </div>
      </div>
      <p className={'real_time'}>
        Cliquez sur un produit pour le modifier en temps réel
      </p>
    </Main>
  );
};

const Main = styled.div<{ $stockStatus: boolean }>`
  position: relative;
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
      transition: all 0.3s ease-in-out;
    }

    input:focus {
      border: ${theme.colors.primary};
    }
  }

  .stock {
    display: flex;
    gap: 20px;

    .quantity {
      display: flex;
      gap: 10px;
      align-items: center;

      p {
        text-align: center;
        background-color: ${theme.colors.greyLight};
        width: 30px;
        padding: 10px 20px;
        border-radius: ${theme.borderRadius.round};
      }

      .icon {
        cursor: pointer;
      }
    }

    .stock_label {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: ${theme.colors.greyLight};
      padding: 10px 20px;
      border-radius: ${theme.borderRadius.round};
      color: ${({ $stockStatus }) =>
        $stockStatus ? theme.colors.red : theme.colors.success};
    }
  }

  .real_time {
    margin-top: 10px;
    color: ${theme.colors.success};
    font-size: 14px;
  }
`;
