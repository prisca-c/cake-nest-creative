import { ItemCard } from './ItemCard.tsx';
import { ItemMenuType } from '../../types/ItemMenuType.ts';
import { fakeMenu2 } from '../../data/fakeMenu.ts';
import styled from 'styled-components';
import { theme } from '../../theme';

export const Menu = () => {
  return (
    <MenuDiv>
      {fakeMenu2.map((item: ItemMenuType) => (
        <ItemCard item={item} />
      ))}
    </MenuDiv>
  );
};

const MenuDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  gap: 20px;

  @media ${theme.devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${theme.devices.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;
