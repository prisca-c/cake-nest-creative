import { ItemCard } from './ItemCard.tsx';
import { MenuType, ProductType } from '@Types/ProductType.ts';
import { fakeMenu1, fakeMenu2 } from '../../data/fakeMenu.ts';
import styled from 'styled-components';
import { theme } from '../../theme';
import { getDateNowNumber } from '../../utils/date.ts';
import { OutOfStock } from './OutOfStock/OutOfStock.tsx';
import { useContext, useEffect } from 'react';
import { MenusContext } from '../../context/MenusContext.ts';
import { SelectMenu } from './SelectMenu.tsx';

export const OrderMenu = () => {
  const { menus, setMenus, setSelectedMenu, selectedMenu } =
    useContext(MenusContext);

  useEffect(() => {
    setMenus([fakeMenu1, fakeMenu2]);
    setSelectedMenu(fakeMenu1.id);
  }, [setMenus, setSelectedMenu]);

  const getSelectedMenu = (): MenuType | null => {
    return menus.find((menu: MenuType) => menu.id === selectedMenu) || null;
  };

  return (
    <>
      <SelectMenu />
      {!getSelectedMenu() ? (
        <OutOfStock />
      ) : (
        <MenuDiv>
          {getSelectedMenu()?.products?.map((item: ProductType) => (
            <ItemCard item={item} key={`${item.title}-${getDateNowNumber()}`} />
          ))}
        </MenuDiv>
      )}
    </>
  );
};

const MenuDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  padding: clamp(20px, 5vw, 40px) clamp(20px, 5vw, 40px);

  @media ${theme.devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  @media ${theme.devices.laptop} {
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
  }
`;
