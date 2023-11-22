import { ItemCard } from './ItemCard.tsx';
import { ItemMenuType } from '../../types/ItemMenuType.ts';
import { fakeMenu1, fakeMenu2 } from '../../data/fakeMenu.ts';
import styled from 'styled-components';
import { theme } from '../../theme';
import { getDateNowNumber } from '../../utils/date.ts';

export const Menu = () => {
  const menus = [...fakeMenu1, ...fakeMenu2];

  return (
    <MenuDiv>
      {menus.map((item: ItemMenuType) => (
        <ItemCard item={item} key={`${item.title}-${getDateNowNumber()}`} />
      ))}
    </MenuDiv>
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
