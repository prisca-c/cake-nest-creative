export const initialProductState = {
  id: crypto.randomUUID(),
  title: '',
  imageSource: '',
  price: 0,
  quantity: 0,
  isAvailable: false,
  isAdvertised: false,
};

export type ProductType = {
  id: string;
  imageSource: string;
  title: string;
  price: number;
  quantity: number;
  isAvailable: boolean;
  isAdvertised: boolean;
};
