import { useContext, useState } from 'react';
import { ManageProductStatesContext } from '@Context/ManageProductStates.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { MenusContext } from '@Context/MenusContext.ts';
import { CartContext } from '@Context/CartContext.ts';
import { handleFrenchPriceFormat } from '@Utils/math.ts';
import { CartItemType } from '@Types/CartType.ts';
import { ProductType } from '@Types/ProductType.ts';

export const useHandleCard = () => {
  const { openState, setOpenState, selectedTab, setSelectedTab } = useContext(
    ManageProductStatesContext,
  );
  const { adminMode, selectedProduct, setSelectedProduct } =
    useContext(AdminModeContext);
  const { menus, setMenus, selectedMenu } = useContext(MenusContext);
  const { cart, setCart, setTotal } = useContext(CartContext);

  const [hover, setHover] = useState(false);

  const handlePrice = (price: number | string) =>
    handleFrenchPriceFormat(price);

  const handleDelete = (id: string) => {
    const newMenus = menus.map((menu) =>
      menu.id === selectedMenu
        ? { ...menu, products: menu.products.filter((item) => item.id !== id) }
        : menu,
    );
    setMenus(newMenus);
  };

  const handleOnHover = (state: boolean) => adminMode && setHover(state);

  const handleActiveSelectedCard = (id: string) =>
    selectedProduct.productId === id && adminMode;

  const handleClass = (id: string) =>
    handleActiveSelectedCard(id) ? 'active' : '';

  const handleSelect = (id: string) => {
    if (!adminMode) return;

    setSelectedProduct({ productId: id, menuId: selectedMenu });

    if (selectedTab === 'add') setSelectedTab('edit');
    if (!openState) setOpenState(true);
  };

  const handleAddToCart = (item: ProductType) => {
    const cartItem: CartItemType = {
      id: item.id,
      menuId: selectedMenu,
      product: item,
    };

    const newCartItems = [...cart.items, cartItem];
    const newTotal = newCartItems.reduce(
      (acc, item) => acc + item.product.price,
      0,
    );

    setTotal(handleFrenchPriceFormat(newTotal));
    setCart({ ...cart, items: newCartItems });
  };

  return {
    handlePrice,
    handleDelete,
    handleOnHover,
    handleClass,
    handleSelect,
    handleActiveSelectedCard,
    handleAddToCart,
    adminMode,
    hover,
  };
};
