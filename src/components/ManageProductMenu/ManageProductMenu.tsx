import styled from 'styled-components';
import { ManageProductNavigationBar } from './ManageProductNavigationBar.tsx';
import { useState } from 'react';

export const ManageProductMenu = () => {
  const [openState, setOpenState] = useState<boolean>(false);
  const handleBodyClass = () => {
    return openState ? 'open' : '';
  };

  return (
    <MenuContainer>
      <div className={'fixed'}>
        <ManageProductNavigationBar
          openState={openState}
          setOpenState={setOpenState}
        />
        <MenuBody className={handleBodyClass()}>
          <p>Test</p>
        </MenuBody>
      </div>
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
  padding: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
  border-radius: 0 0 10px 10px;
  height: 0;
  overflow: scroll;
  transition: height 0.3s ease-in-out;

  p {
    display: none;
  }

  &.open {
    height: 300px;
    padding: 15px 20px;

    p {
      display: block;
    }
  }
`;
