import React, { useContext, useEffect } from 'react';
import type { ManageProductType } from '@Types/ManageProductType.ts';
import { MenusContext } from '@Context/MenusContext.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';

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

  const { productId, menuId } = selectedProduct;

  useEffect(() => {
    handleData();
  }, [selectedProduct]);

  useEffect(() => {
    handleUpdateProduct();
  }, [data]);

  const handleData = () => {
    const menu = menus.find((menu) => menu.id === selectedProduct.menuId);
    const product = menu?.products.find(
      (product) => product.id === selectedProduct.productId,
    );
    if (product) {
      setData({
        name: product.title,
        image: product.imageSource,
        price: product.price,
      });
    }
  };

  const handleUpdateProduct = () => {
    const newMenus = menus.map((menu) => {
      if (menu.id === menuId) {
        return {
          ...menu,
          products: menu.products.map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                title: data.name,
                imageSource: data.image,
                price: data.price,
              };
            }
            return product;
          }),
        };
      }
      return menu;
    });
    setMenus(newMenus);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  return {
    handleChange,
  };
};
