import React, { useContext, useEffect, useRef } from 'react';
import type { ManageProductType } from '@Types/ManageProductType.ts';
import { MenusContext } from '@Context/MenusContext.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { ManageProductStatesContext } from '@Context/ManageProductStates.ts';

type UseEditProductFormProps = {
  data: ManageProductType;
  setData: React.Dispatch<React.SetStateAction<ManageProductType>>;
};

export const useEditProductForm = ({
  data,
  setData,
}: UseEditProductFormProps) => {
  const { menus, setMenus } = useContext(MenusContext);
  const { selectedProduct } = useContext(AdminModeContext);
  const { openState } = useContext(ManageProductStatesContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const { productId, menuId } = selectedProduct;

  useEffect(() => {
    handleData();
  }, [selectedProduct]);

  useEffect(() => {
    handleUpdateProduct();
  }, [data]);

  useEffect(() => {
    if (openState) {
      inputRef.current?.focus();
    }
  }, [openState, selectedProduct]);

  const handleData = () => {
    const product = menus
      .find((menu) => menu.id === menuId)
      ?.products.find((product) => product.id === productId);

    if (product) {
      setData({
        name: product.title,
        image: product.imageSource,
        price: product.price,
        quantity: product.quantity,
        isAvailable: product.isAvailable,
      });
    }
  };

  const handleUpdateProduct = () => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              products: menu.products.map((product) =>
                product.id === productId
                  ? {
                      ...product,
                      title: data.name,
                      imageSource: data.image,
                      price: data.price,
                      quantity: data.quantity,
                      isAvailable: data.isAvailable,
                    }
                  : product,
              ),
            }
          : menu,
      ),
    );
  };

  const handleAvailable = () => {
    setData((prev) => ({ ...prev, isAvailable: !prev.isAvailable }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

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

  return {
    handleChange,
    openState,
    selectedProduct,
    handleAvailable,
    handleQuantity,
    stockStatus,
    inputRef,
  };
};
