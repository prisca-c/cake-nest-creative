import { ProductType } from '@Types/ProductType.ts';
import styled from 'styled-components';
import { handleFrenchPriceFormat } from '@Utils/math.ts';
import { Button } from '../Button.tsx';
import { theme } from '~@/theme';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { useContext, useState } from 'react';
import { MenusContext } from '@Context/MenusContext.ts';

type ItemCardProps = {
  item: ProductType;
};

export const ItemCard = ({ item }: ItemCardProps) => {
  const { adminMode, selectedProduct, setSelectedProduct } =
    useContext(AdminModeContext);
  const { menus, setMenus, selectedMenu } = useContext(MenusContext);
  const [hover, setHover] = useState(false);

  const handleActiveSelectedCard = (id: string) => {
    return selectedProduct.productId === id;
  };

  const handleSelect = (id: string) => {
    setSelectedProduct({
      productId: id,
      menuId: selectedMenu,
    });
  };

  const handlePrice = (price: number | string) => {
    return handleFrenchPriceFormat(price);
  };

  const handleDelete = (id: string) => {
    const newMenus = menus.map((menu) => {
      if (menu.id === selectedMenu) {
        const newItems = menu.products.filter((item) => item.id !== id);
        return {
          ...menu,
          products: newItems,
        };
      }
      return menu;
    });
    setMenus(newMenus);
  };

  const handleOnHover = (state: boolean) => {
    setHover(state);
  };

  const handleClass = (id: string) => {
    return handleActiveSelectedCard(id) ? 'active' : '';
  };

  return (
    <Card
      onMouseOver={() => handleOnHover(true)}
      onMouseOut={() => handleOnHover(false)}
      $onHover={hover}
      onClick={() => handleSelect(item.id)}
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
          onClick={() => handleDelete(item.id)}
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
  cursor: pointer;

  p {
    color: ${theme.colors.primary};
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadows.blue};
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
`;
