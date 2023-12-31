import React from 'react';
import type { ProductType } from '@Types/ProductType.ts';
import styled from 'styled-components';
import { Button } from '../Button.tsx';
import { theme } from '~@/ui/theme';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useHandleCard } from '@Hooks/components/useHandleCard.ts';
import { useHandleProductSelected } from '@Hooks/useHandleProductSelected.ts';
import { ItemCardOutOfStock } from '~@/ui/components/OrderMenu/OutOfStock/ItemCardOutOfStock.tsx';

type ItemCardProps = {
  item: ProductType;
};

export const ItemCard = ({ item }: ItemCardProps) => {
  const {
    handleDelete,
    handleOnHover,
    handlePrice,
    handleAddToCart,
    handleTopLabel,
    hover,
    adminMode,
  } = useHandleCard();
  const { handleSelect, handleClass, handleActiveSelectedCard } =
    useHandleProductSelected();

  return (
    <Card
      onMouseOver={() => handleOnHover(true)}
      onMouseOut={() => handleOnHover(false)}
      $onHover={hover}
      $advertise={item.isAdvertised}
      onClick={(e) => handleSelect(e, item.id)}
      className={handleClass(item.id)}
    >
      {item.quantity <= 0 && <ItemCardOutOfStock />}
      {(!item.isAvailable || item.isAdvertised) && (
        <div className={handleTopLabel(item)?.class}>
          <p>{handleTopLabel(item)?.label}</p>
        </div>
      )}
      {adminMode && (
        <AiFillCloseCircle
          className={'delete'}
          color={
            handleActiveSelectedCard(item.id)
              ? theme.colors.white
              : theme.colors.primary
          }
          size={20}
          onClick={(e: React.MouseEvent<SVGSVGElement>) =>
            handleDelete(e, item)
          }
        />
      )}
      <img src={item.imageSource} alt={item.title} />
      <div className={'infos'}>
        <h3>{item.title}</h3>
        <div className={'footer'}>
          <p className={'price'}>{handlePrice(item.price)}</p>
          <Button
            variant={'primary'}
            width={'100px'}
            active={handleActiveSelectedCard(item.id)}
            disabled={item.quantity === 0}
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

const Card = styled.div<{ $onHover: boolean; $advertise: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: ${({ $advertise }) =>
    $advertise
      ? '0 0 10px 0 rgba(236, 181, 74, 1)'
      : '0 0 10px 0 rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  transform: scale(1);
  background-color: ${theme.colors.white};
  cursor: ${({ $onHover }) => ($onHover ? 'pointer' : 'default')};
  border: ${({ $advertise }) =>
    $advertise ? `2px solid rgba(236, 181, 74, 0.8)` : 'none'};

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
    border-radius: ${theme.borderRadius.round};
    z-index: -1;
    animation: ${({ $advertise }) =>
      $advertise && 'rotate 5s ease-in-out infinite'};

    @keyframes rotate {
      0%,
      100% {
        transform: rotate(20deg);
      }
      50% {
        transform: rotate(-20deg);
      }
    }
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: clamp(100px, 200px, 20vw);
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

  .price {
    color: ${theme.colors.primary};
  }

  .unavailable {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    padding: 10px 0;
    background-color: ${theme.colors.red};
    font-family: 'Open Sans', sans-serif;
    width: 100%;
  }

  .advertise {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    text-transform: uppercase;
    padding: 10px 0;
    background-color: rgba(236, 181, 74, 0.8);
    font-family: 'Open Sans', sans-serif;
    width: 100%;
  }

  .delete,
  .footer {
    z-index: 10;
  }
`;
