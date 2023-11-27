import React from 'react';
import type { ProductType } from '@Types/ProductType.ts';
import styled from 'styled-components';
import { Button } from '../Button.tsx';
import { theme } from '~@/theme';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useHandleCard } from '@Hooks/useHandleCard.ts';

type ItemCardProps = {
  item: ProductType;
};

export const ItemCard = ({ item }: ItemCardProps) => {
  const {
    handleSelect,
    handleDelete,
    handleOnHover,
    handlePrice,
    handleClass,
    handleActiveSelectedCard,
    handleAddToCart,
    hover,
    adminMode,
  } = useHandleCard();

  return (
    <Card
      onMouseOver={() => handleOnHover(true)}
      onMouseOut={() => handleOnHover(false)}
      $onHover={hover}
      onClick={(e) => handleSelect(e, item.id)}
      className={handleClass(item.id)}
    >
      {adminMode && (
        <AiFillCloseCircle
          className={'delete'}
          color={
            handleActiveSelectedCard(item.id)
              ? theme.colors.white
              : theme.colors.primary
          }
          size={20}
          onClick={(e: any) => handleDelete(e, item)}
        />
      )}
      <img src={item.imageSource} alt={item.title} />
      <div className={'infos'}>
        <h3>{item.title}</h3>
        <div className={'footer'}>
          <p>{handlePrice(item.price)}</p>
          <Button
            variant={'primary'}
            width={'100px'}
            active={handleActiveSelectedCard(item.id)}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleAddToCart(e, item)
            }
          >
            Ajouter
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Card = styled.div<{ $onHover: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  transform: scale(1);
  background-color: ${theme.colors.white};
  cursor: ${({ $onHover }) => ($onHover ? 'pointer' : 'default')};

  p {
    color: ${theme.colors.primary};
  }

  &:hover {
    transform: ${({ $onHover }) => ($onHover ? 'scale(1.05)' : 'scale(1)')};
    box-shadow: ${({ $onHover }) =>
      $onHover
        ? theme.shadows.blue
        : 'box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);'};
  }

  &.active {
    background-color: ${theme.colors.primary};
    transform: scale(1.05);
    p {
      color: ${theme.colors.white};
    }
  }

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
      }
    }
  }

  .delete,
  .footer {
    z-index: 10;
  }
`;
