import { useContext } from 'react';
import { MenusContext } from '@Context/MenusContext.ts';
import { ItemCard } from './ItemCard.tsx';
import styled from 'styled-components';
import { theme } from '~@/ui/theme';
import { getDateNowNumber } from '@Utils/date.ts';
import { OutOfStock } from './OutOfStock/OutOfStock.tsx';
import { SelectMenu } from './SelectMenu.tsx';
import type { ProductType } from '@Types/ProductType.ts';
import type { MenuType } from '@Types/MenuType.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';

export const OrderMenu = () => {
  const { menus, selectedMenu } = useContext(MenusContext);
  const { adminMode } = useContext(AdminModeContext);

  const getSelectedMenu = (): MenuType | null => {
    if (!menus) return null;
    return menus.find((menu: MenuType) => menu.id === selectedMenu) ?? null;
  };

  return (
    <>
      <SelectMenu />
      {menus &&
      getSelectedMenu() &&
      getSelectedMenu()?.products?.length === 0 ? (
        <OutOfStock />
      ) : (
        <MenuDiv>
          {getSelectedMenu()?.products?.map(
            (item: ProductType) =>
              (item.isAvailable || adminMode) && (
                <ItemCard
                  item={item}
                  key={`${item.id}-${getDateNowNumber()}`}
                />
              ),
          )}
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
    gap: 20px;
  }

  @media ${theme.devices.laptop} {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
`;
