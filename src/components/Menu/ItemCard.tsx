import { ItemMenuType } from '../../types/ItemMenuType.ts';
import styled from 'styled-components';
import { handleFrenchPriceFormat } from '../../utils/math.ts';
import { Button } from '../Button.tsx';
import { theme } from '../../theme';

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
      <div className={'infos'}>
        <h3>{item.title}</h3>
        <div className={'footer'}>
          <p>{handlePrice(item.price)}</p>
          <Button variant={'primary'} width={'100px'}>
            Ajouter
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 10px;

  &:hover {
    transform: scale(1.05);
  }

  img {
    height: 200px;
    width: auto;
    object-fit: cover;
  }

  .infos {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    height: 100px;

    h3 {
      font-family: 'Pacifico', cursive;
      font-size: 1.2rem;
      font-weight: 600;
      color: #000;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-family: 'Open Sans', sans-serif;
        font-size: 1rem;
        font-weight: 400;
        vertical-align: center;
        color: ${theme.colors.primary};
      }
    }
  }
`;
