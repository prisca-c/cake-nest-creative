import React, { useContext, useEffect, useRef } from 'react';
import { MenusContext } from '@Context/MenusContext.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { ManageProductStatesContext } from '@Context/ManageProductStates.ts';
import { useUpdateMenuUseCases } from '~@/usecases/useUpdateMenuUseCases.ts';
import { ProductType } from '@Types/ProductType.ts';

type UseEditProductFormProps = {
  data: ProductType;
  setData: React.Dispatch<React.SetStateAction<ProductType>>;
};

export const useEditProductForm = ({
  data,
  setData,
}: UseEditProductFormProps) => {
  const { menus } = useContext(MenusContext);
  const { selectedProduct } = useContext(AdminModeContext);
  const { openState } = useContext(ManageProductStatesContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const { productId, menuId } = selectedProduct;
  const { updateMenus } = useUpdateMenuUseCases();

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
        ...data,
        title: product.title,
        imageSource: product.imageSource,
        price: product.price,
        quantity: product.quantity,
        isAvailable: product.isAvailable,
        isAdvertised: product.isAdvertised,
      });
    }
  };

  const handleUpdateProduct = async () => {
    const newMenus = menus.map((menu) => {
      if (menu.id === menuId) {
        return {
          ...menu,
          products: menu.products.map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                title: data.title,
                imageSource: data.imageSource,
                price: data.price,
                quantity: data.quantity,
                isAvailable: data.isAvailable,
                isAdvertised: data.isAdvertised,
              };
            }
            return product;
          }),
        };
      }
      return menu;
    });

    await updateMenus(newMenus);
  };

  const handleAvailable = () => {
    setData((prev) => ({ ...prev, isAvailable: !prev.isAvailable }));
  };

  const handleAdvertised = () => {
    setData((prev) => ({ ...prev, isAdvertised: !prev.isAdvertised }));
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
    handleAdvertised,
    handleQuantity,
    stockStatus,
    inputRef,
  };
};
