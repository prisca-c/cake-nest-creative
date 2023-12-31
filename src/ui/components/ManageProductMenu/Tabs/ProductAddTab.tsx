import { useState } from 'react';
import { theme } from '~@/ui/theme';
import styled from 'styled-components';
import { ProductAddForm } from './ProductAddForm.tsx';
import type { ProductType } from '@Types/ProductType.ts';
import { initialProductState } from '@Types/ProductType.ts';

export const ProductAddTab = () => {
  const [data, setData] = useState<ProductType>(initialProductState);

  return (
    <Main>
      <div className={'image-container'}>
        {data.imageSource === '' ? (
          <p>Aucune Image</p>
        ) : (
          <img src={data.imageSource} alt={data.title} />
        )}
      </div>
      <ProductAddForm data={data} setData={setData} />
    </Main>
  );
};

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;
  padding: 20px 30px;

  .image-container {
    border: 1px solid ${theme.colors.greyLight};
    border-radius: ${theme.borderRadius.round};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.colors.greyDark};
    padding: 20px;
    height: 100px;
    text-align: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
