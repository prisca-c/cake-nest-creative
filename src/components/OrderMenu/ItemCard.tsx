import { ProductType } from '@Types/ProductType.ts';
import styled from 'styled-components';
import { handleFrenchPriceFormat } from '../../utils/math.ts';
import { Button } from '../Button.tsx';
import { theme } from '../../theme';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AdminModeContext } from '../../context/AdminModeContext.ts';
import { useContext } from 'react';

type ItemCardProps = {
  item: ProductType;
};

export const ItemCard = ({ item }: ItemCardProps) => {
  const { adminMode } = useContext(AdminModeContext);
  const handlePrice = (price: number | string) => {
    return handleFrenchPriceFormat(price);
  };

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <Card>
      {adminMode && (
        <AiFillCloseCircle
          className={'delete'}
          color={theme.colors.primary}
          size={20}
          onClick={handleDelete}
        />
      )}
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
  padding: 10px;

  .delete {
    margin-left: auto;
    cursor: pointer;
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
      font-size: 1.6rem;
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
