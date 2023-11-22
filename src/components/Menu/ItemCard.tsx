import { ItemMenuType } from '../../types/ItemMenuType.ts';
import styled from 'styled-components';
import { handleFrenchPriceFormat } from '../../utils/math.ts';

type ItemCardProps = {
  item: ItemMenuType;
};

export const ItemCard = ({ item }: ItemCardProps) => {
  const handlePrice = (price: number | string) => {
    return handleFrenchPriceFormat(price);
  };

  return (
    <Card>
      <img src={item.imageSource} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{handlePrice(item.price)}</p>
      </div>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    height: 100px;

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #000;
    }

    p {
      font-size: 1rem;
      font-weight: 400;
      color: #000;
    }
  }
`;
