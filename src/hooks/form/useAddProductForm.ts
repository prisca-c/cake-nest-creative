import React, { useState } from 'react';
import { MenusContext } from '@Context/MenusContext.ts';
import { useTimer } from '@Hooks/useTimer.ts';
import { getDateNowNumber } from '@Utils/date.ts';
import type { ProductType } from '@Types/ProductType.ts';
import { useUpdateMenuUseCases } from '~@/usecases/useUpdateMenuUseCases.ts';
import { initialProductState } from '@Types/ProductType.ts';

type UseAddProductFormProps = {
  setData: React.Dispatch<React.SetStateAction<ProductType>>;
};

export const useAddProductForm = ({ setData }: UseAddProductFormProps) => {
  const [newData, setNewData] = useState<ProductType>(initialProductState);
  const { menus, selectedMenu } = React.useContext(MenusContext);
  const { timerState, setTimerState } = useTimer({ time: 2000 });
  const { updateMenus } = useUpdateMenuUseCases();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewData({
      ...newData,
      [e.target.id]: e.target.value,
    });

    setData({
      ...newData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAddProduct = async (data: ProductType) => {
    const newProduct: ProductType = {
      id: getDateNowNumber(),
      title: data.title,
      imageSource: data.imageSource,
      price: data.price,
      quantity: data.quantity,
      isAdvertised: data.isAdvertised,
      isAvailable: data.isAvailable,
    };

    const newMenus = menus.map((menu) =>
      menu.id === selectedMenu
        ? {
            ...menu,
            products: [...menu.products, newProduct],
          }
        : menu,
    );

    await updateMenus(newMenus);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO Error handling

    setData(newData);
    handleAddProduct(newData);
    setTimerState(true);
    setNewData(initialProductState);
    setData(initialProductState);
  };

  const handleQuantity = (type: 'add' | 'remove') => {
    if (type === 'add') {
      setNewData((prevState) => ({
        ...prevState,
        quantity: prevState.quantity + 1,
      }));
    }

    if (type === 'remove' && newData.quantity > 0) {
      setNewData((prevState) => ({
        ...prevState,
        quantity: prevState.quantity - 1,
      }));
    }
  };

  const stockStatus = () => {
    return newData.quantity <= 0;
  };

  const handleAvailable = () => {
    setNewData((prev) => ({ ...prev, isAvailable: !prev.isAvailable }));
  };

  const handleAdvertised = () => {
    setNewData((prev) => ({ ...prev, isAdvertised: !prev.isAdvertised }));
  };

  return {
    setNewData,
    newData,
    handleChange,
    handleSubmit,
    timerState,
    handleQuantity,
    stockStatus,
    handleAvailable,
    handleAdvertised,
  };
};
