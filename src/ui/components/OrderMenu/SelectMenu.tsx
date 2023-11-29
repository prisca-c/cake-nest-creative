import { useContext } from 'react';
import { MenusContext } from '@Context/MenusContext.ts';
import styled from 'styled-components';
import { Button } from '../Button.tsx';

export const SelectMenu = () => {
  const { menus, selectedMenu, setSelectedMenu } = useContext(MenusContext);
  return (
    <Main>
      {menus &&
        menus.map((menu) => (
          <Button
            key={menu.id}
            onClick={() => setSelectedMenu(menu.id)}
            active={menu.id === selectedMenu}
            variant={'primary'}
            width={'200px'}
          >
            {menu.name}
          </Button>
        ))}
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: fit-content;
`;
