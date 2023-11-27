import { useContext } from 'react';
import styled from 'styled-components';
import { Button } from '@Components/Button.tsx';
import { MenusContext } from '@Context/MenusContext.ts';
import { fakeMenu1, fakeMenu2 } from '~@/data/fakeMenu.ts';

export const AdminOutOfStock = () => {
  const { menus, setMenus, selectedMenu } = useContext(MenusContext);

  const handleNewProducts = () => {
    const seletedFakeMenu = selectedMenu === '1' ? fakeMenu1 : fakeMenu2;
    if (!menus) return;
    const newMenus = menus?.map((menu) => {
      if (menu.products.length > 0) {
        return menu;
      } else {
        return seletedFakeMenu;
      }
    });
    if (typeof newMenus === 'undefined') return;

    setMenus(newMenus);
  };

  return (
    <Main>
      <p>
        Le menu est vide ?<span>Cliquez ci-dessous pour le réinitialiser</span>
      </p>
      <Button
        variant={'primary'}
        width={'fit-content'}
        onClick={handleNewProducts}
      >
        Générer de nouveaux produits
      </Button>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  span {
    display: block;
  }
`;
