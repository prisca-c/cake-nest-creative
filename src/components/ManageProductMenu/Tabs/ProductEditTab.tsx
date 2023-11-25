import { useContext, useState } from 'react';
import { ManageProductType } from '@Types/ManageProductType.ts';
import styled from 'styled-components';
import { theme } from '~@/theme';
import { ProductEditForm } from '@Components/ManageProductMenu/Tabs/ProductEditForm.tsx';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { DivCenter } from '@Components/DivCenter.tsx';
import { HiCursorClick } from 'react-icons/hi';

export const ProductEditTab = () => {
  const { selectedProduct } = useContext(AdminModeContext);
  const [data, setData] = useState<ManageProductType>({
    name: '',
    image: '',
    price: 0,
  });

  return (
    <DivCenter>
      {selectedProduct.productId === '' ? (
        <Text>Cliquez sur un produit pour le modifier {HiCursorClick()}</Text>
      ) : (
        <Main>
          <div className={'image-container'}>
            {data.image === '' ? (
              <p>Aucune Image</p>
            ) : (
              <img src={data.image} alt={data.name} />
            )}
          </div>
          <ProductEditForm data={data} setData={setData} />
        </Main>
      )}
    </DivCenter>
  );
};

const Text = styled.p`
  font-family: 'Pacifico', cursive;
  color: ${theme.colors.greyDark};
`;

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
