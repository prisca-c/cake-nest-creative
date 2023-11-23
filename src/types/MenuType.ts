import { ProductType } from '@Types/ProductType.ts';

export type MenuType = {
  id: string;
  name: string;
  products: ProductType[];
};
