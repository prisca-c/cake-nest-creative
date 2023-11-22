import styled from 'styled-components';
import { ManageProductNavigationBar } from './ManageProductNavigationBar.tsx';
import { theme } from '../../theme';
import { useState } from 'react';

export const ManageProductMenu = () => {
  const [openState, setOpenState] = useState<boolean>(false);
  return (
    <MenuContainer>
      <ManageProductNavigationBar
        openState={openState}
        setOpenState={setOpenState}
      />
      <MenuBody>
        <p>Test</p>
      </MenuBody>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const MenuBody = styled.div`
  background-color: #fff;
  padding: 15px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
  border-radius: 0 0 10px 10px;
  height: 100%;
  overflow: scroll;
`;
