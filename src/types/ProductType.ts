export type ProductType = {
  id: number;
  imageSource: string;
  title: string;
  price: number;
  quantity: number;
  isAvailable: boolean;
  isAdvertised: boolean;
};

export type MenuType = {
  id: string;
  name: string;
  products: ProductType[];
};
