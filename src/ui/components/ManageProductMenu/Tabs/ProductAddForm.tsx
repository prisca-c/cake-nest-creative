import { useAddProductForm } from '@Hooks/form/useAddProductForm.ts';
import React from 'react';
import { FaCamera } from 'react-icons/fa';
import { FiCheckCircle, FiPackage } from 'react-icons/fi';
import { GiCupcake } from 'react-icons/gi';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEuro } from 'react-icons/md';
import styled from 'styled-components';

import { theme } from '~@/ui/theme';
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import type { ProductType } from '@Types/ProductType.ts';

type ProductAddFormProps = {
  data: ProductType;
  setData: React.Dispatch<React.SetStateAction<ProductType>>;
};

export const ProductAddForm = ({ setData }: ProductAddFormProps) => {
  const {
    newData,
    handleSubmit,
    handleChange,
    timerState,
    handleQuantity,
    handleAvailable,
    handleAdvertised,
    stockStatus,
  } = useAddProductForm({ setData });

  return (
    <Form
      onSubmit={handleSubmit}
      $stockStatus={stockStatus()}
      $available={newData.isAvailable}
      $advertise={newData.isAdvertised}
    >
      <div className={'input-group'}>
        <GiCupcake color={theme.colors.greyDark} size={20} />
        <input
          type="text"
          placeholder="Nom du produit"
          onChange={handleChange}
          value={newData.title}
          id="title"
        />
      </div>
      <div className={'input-group'}>
        <FaCamera color={theme.colors.greyDark} size={20} />
        <input
          type="text"
          placeholder="Lien URL de l'image (ex: https://mon-url.me/mon-produit.png)"
          onChange={handleChange}
          value={newData.imageSource}
          id="imageSource"
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
      <div className={'stock'}>
        <div className={'quantity'}>
          <IoMdRemoveCircle
            color={theme.colors.greyDark}
            size={20}
            onClick={() => handleQuantity('remove')}
            className={'icon'}
          />
          <p>{newData.quantity}</p>
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

        <div className={'available'} onClick={handleAvailable}>
          {newData.isAvailable ? (
            <MdCheckBox color={theme.colors.greyDark} size={20} />
          ) : (
            <MdCheckBoxOutlineBlank color={theme.colors.greyDark} size={20} />
          )}
          <p>Disponible</p>
        </div>

        <div className={'advertise'} onClick={handleAdvertised}>
          {newData.isAdvertised ? (
            <MdCheckBox color={theme.colors.greyDark} size={20} />
          ) : (
            <MdCheckBoxOutlineBlank color={theme.colors.greyDark} size={20} />
          )}
          <p>En avant</p>
        </div>
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

const Form = styled.form<{
  $stockStatus: boolean;
  $available: boolean;
  $advertise: boolean;
}>`
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

  .stock {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;

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
      flex-direction: column;
      align-items: center;
      gap: 10px;
      background-color: ${theme.colors.greyLight};
      padding: 10px 20px;
      border-radius: ${theme.borderRadius.round};
      color: ${({ $stockStatus }) =>
        $stockStatus ? theme.colors.red : theme.colors.success};
    }
  }

  .add-group {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;

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

  .available {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: ${theme.colors.greyLight};
    padding: 10px 20px;
    border-radius: ${theme.borderRadius.round};
    cursor: pointer;
    color: ${({ $available }) =>
      $available ? theme.colors.success : theme.colors.greyDark};
    border: 1px solid
      ${({ $available }) =>
        $available ? theme.colors.success : theme.colors.greyLight};
  }

  .advertise {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: ${theme.colors.greyLight};
    padding: 10px 20px;
    border-radius: ${theme.borderRadius.round};
    cursor: pointer;
    color: ${({ $advertise }) =>
      $advertise ? theme.colors.success : theme.colors.greyDark};
    border: 1px solid
      ${({ $advertise }) =>
        $advertise ? theme.colors.success : theme.colors.greyLight};
  }
`;
