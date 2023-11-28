import React, { useContext, useEffect } from 'react';
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
  const { productId, menuId } = selectedProduct;

  useEffect(() => {
    handleData();
  }, [selectedProduct]);

  useEffect(() => {
    handleUpdateProduct();
  }, [data]);

  const handleData = () => {
    const product = menus
      .find((menu) => menu.id === menuId)
      ?.products.find((product) => product.id === productId);

    if (product) {
      setData({
        name: product.title,
        image: product.imageSource,
        price: product.price,
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
                    }
                  : product,
              ),
            }
          : menu,
      ),
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return { handleChange, openState, selectedProduct };
};
