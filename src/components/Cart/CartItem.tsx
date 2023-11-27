import { handleFrenchPriceFormat } from '@Utils/math.ts';
import styled from 'styled-components';
import type { ProductType } from '@Types/ProductType.ts';

type CartItemProps = {
  item: ProductType;
};

export const CartItem = ({ item }: CartItemProps) => {
  return (
    <Main>
      <img src={item.imageSource} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>{handleFrenchPriceFormat(item.price)}</p>
        </div>
      </div>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  h3 {
    margin: 0;
  }

  .information {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
