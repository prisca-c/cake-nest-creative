import { useContext } from 'react';
import styled from 'styled-components';
import { Button } from '~@/ui/components/Button.tsx';
import { MenusContext } from '@Context/MenusContext.ts';
import { fakeMenu1, fakeMenu2 } from '~@/data/fakeMenu.ts';
import { useUpdateMenuUseCases } from '~@/usecases/useUpdateMenuUseCases.ts';

export const AdminOutOfStock = () => {
  const { menus, selectedMenu } = useContext(MenusContext);
  const { updateMenus } = useUpdateMenuUseCases();

  const handleNewProducts = async () => {
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

    await updateMenus(newMenus);
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
