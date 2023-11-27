export type CartItemType = {
  id: string;
  menuId: string;
  productId: string;
  quantity: number;
  createdAt: string;
};

export type CartType = {
  id: string;
  user: string;
  items: CartItemType[];
};
