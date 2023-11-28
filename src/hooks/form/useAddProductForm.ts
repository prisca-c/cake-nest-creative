import React, { useState } from 'react';
import { MenusContext } from '@Context/MenusContext.ts';
import { useTimer } from '@Hooks/useTimer.ts';
import { getDateNowNumber } from '@Utils/date.ts';
import type { ManageProductType } from '@Types/ManageProductType.ts';
import type { ProductType } from '@Types/ProductType.ts';

type UseAddProductFormProps = {
  setData: React.Dispatch<React.SetStateAction<ManageProductType>>;
  initialData: ManageProductType;
};

export const useAddProductForm = ({
  setData,
  initialData,
}: UseAddProductFormProps) => {
  const [newData, setNewData] = useState<ManageProductType>(initialData);
  const { setMenus, selectedMenu } = React.useContext(MenusContext);
  const { timerState, setTimerState } = useTimer({ time: 2000 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewData({
      ...newData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAddProduct = (data: ManageProductType) => {
    const newProduct: ProductType = {
      id: getDateNowNumber(),
      title: data.name,
      imageSource: data.image,
      price: data.price,
      quantity: data.quantity,
      isAdvertised: false,
      isAvailable: true,
    };

    setMenus((prevMenus) =>
      prevMenus.map((menu) =>
        menu.id === selectedMenu
          ? {
              ...menu,
              products: [...menu.products, newProduct],
            }
          : menu,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO Error handling

    setData(newData);
    handleAddProduct(newData);
    setTimerState(true);
    setNewData(initialData);
    setData(initialData);
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

  return {
    setNewData,
    newData,
    handleChange,
    handleSubmit,
    timerState,
    handleQuantity,
    stockStatus,
  };
};
