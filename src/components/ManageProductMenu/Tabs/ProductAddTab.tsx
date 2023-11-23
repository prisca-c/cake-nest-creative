import { theme } from '../../../theme';
import styled from 'styled-components';
import { ProductAddForm } from './ProductAddForm.tsx';
import { ManageProductType } from '@Types/ManageProductType.ts';
import { useState } from 'react';

export const ProductAddTab = () => {
  const [data, setData] = useState<ManageProductType>({
    name: '',
    image: '',
    price: 0,
  });

  return (
    <Main>
      <div className={'image-container'}>
        {data.image === '' ? (
          <p>Aucune Image</p>
        ) : (
          <img src={data.image} alt={data.name} />
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

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
