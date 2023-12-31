import { useContext } from 'react';
import styled from 'styled-components';
import { ManageProductNavigationBar } from './ManageProductNavigationBar.tsx';
import { ProductAddTab } from './Tabs/ProductAddTab.tsx';
import { ProductEditTab } from './Tabs/ProductEditTab.tsx';
import { ManageProductStatesContext } from '@Context/ManageProductStates.ts';
import { DiscountTab } from '~@/ui/components/ManageProductMenu/Tabs/DiscountTab.tsx';

export const ManageProductMenu = () => {
  const { openState, setOpenState, selectedTab, setSelectedTab } = useContext(
    ManageProductStatesContext,
  );
  const handleBodyClass = () => {
    return openState ? 'open' : '';
  };

  return (
    <MenuContainer>
      <div className={'fixed'}>
        <ManageProductNavigationBar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          openState={openState}
          setOpenState={setOpenState}
        />
        <MenuBody className={handleBodyClass()}>
          {selectedTab === 'add' && <ProductAddTab />}
          {selectedTab === 'edit' && <ProductEditTab />}
          {selectedTab === 'discount' && <DiscountTab />}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
  border-radius: 0 0 10px 10px;
  height: 0;
  overflow: scroll;
  transition: height 0.3s ease-in-out;
  font-family: 'Open Sans', sans-serif;

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
