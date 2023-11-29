import type { CartItemType } from '@Types/CartType.ts';
import type { MenuType } from '@Types/MenuType.ts';
import type { ProductType } from '@Types/ProductType.ts';

export const getAssociatedProduct = (
  cartItem: CartItemType,
  menus: MenuType[],
): ProductType | undefined => {
  const menu = menus.find((menu) => menu.id === cartItem.menuId);
  const product = menu?.products.find(
    (product) => product.id === cartItem.product.id,
  );
  return product;
};
