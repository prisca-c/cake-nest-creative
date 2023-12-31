import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdModeEditOutline } from 'react-icons/md';
import { theme } from '~@/ui/theme';
import styled from 'styled-components';
import { ManageProductTabType } from '@Types/ManageProductTabType.ts';
import { BiSolidDiscount } from 'react-icons/bi';

type ManageProductNavigationBarProps = {
  selectedTab: ManageProductTabType;
  setSelectedTab: (selectedTab: ManageProductTabType) => void;
  openState: boolean;
  setOpenState: (openState: boolean) => void;
};

export const ManageProductNavigationBar = ({
  selectedTab,
  setSelectedTab,
  openState,
  setOpenState,
}: ManageProductNavigationBarProps) => {
  const handleOpenState = () => {
    setOpenState(!openState);
  };

  const handleSelectedTab = (tab: ManageProductTabType) => {
    if (!openState) handleOpenState();
    setSelectedTab(tab);
  };

  const handleIconColor = (tab: ManageProductTabType): string => {
    return selectedTab === tab ? theme.colors.white : theme.colors.greyMedium;
  };

  return (
    <Container $openState={openState} $selectedTab={selectedTab}>
      <div className={'open-tab'} onClick={handleOpenState}>
        {openState ? (
          <FiChevronDown color={theme.colors.background_dark} />
        ) : (
          <FiChevronUp color={theme.colors.white} />
        )}
      </div>
      <div className={'add-tab'} onClick={() => handleSelectedTab('add')}>
        <AiOutlinePlus color={handleIconColor('add')} />
        <p>Ajouter un produit</p>
      </div>
      <div className={'edit-tab'} onClick={() => handleSelectedTab('edit')}>
        <MdModeEditOutline color={handleIconColor('edit')} />
        <p>Modifier un produit</p>
      </div>
      <div
        className={'discount-tab'}
        onClick={() => handleSelectedTab('discount')}
      >
        <BiSolidDiscount color={handleIconColor('discount')} />
        <p>Code promo</p>
      </div>
    </Container>
  );
};

const Container = styled.div<{
  $openState: boolean;
  $selectedTab: ManageProductTabType;
}>`
  display: inline-flex;
  height: 50px;
  font-family: 'Open Sans', sans-serif;
  margin-left: 60px;

  .open-tab,
  .add-tab,
  .edit-tab,
  .discount-tab {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    border-radius: 5px 5px 0 0;
    box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.35);
    cursor: pointer;
  }

  .open-tab {
    background-color: ${({ $openState }) =>
      !$openState ? theme.colors.incognito : theme.colors.white};
  }

  .add-tab {
    background-color: ${({ $selectedTab }) =>
      $selectedTab === 'add' ? theme.colors.incognito : theme.colors.white};
    color: ${({ $selectedTab }) =>
      $selectedTab === 'add' ? theme.colors.white : theme.colors.greyMedium};
  }

  .edit-tab {
    background-color: ${({ $selectedTab }) =>
      $selectedTab === 'edit' ? theme.colors.incognito : theme.colors.white};
    color: ${({ $selectedTab }) =>
      $selectedTab === 'edit' ? theme.colors.white : theme.colors.greyMedium};
  }

  .discount-tab {
    background-color: ${({ $selectedTab }) =>
      $selectedTab === 'discount'
        ? theme.colors.incognito
        : theme.colors.white};
    color: ${({ $selectedTab }) =>
      $selectedTab === 'discount'
        ? theme.colors.white
        : theme.colors.greyMedium};
  }

  .add-tab,
  .edit-tab,
  .discount-tab {
    display: inline-flex;
    gap: 10px;
  }
`;
