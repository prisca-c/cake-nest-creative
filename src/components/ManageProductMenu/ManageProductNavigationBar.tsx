import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdModeEditOutline } from 'react-icons/md';
import { theme } from '../../theme';
import styled from 'styled-components';

type ManageProductNavigationBarProps = {
  openState: boolean;
  setOpenState: (openState: boolean) => void;
};

export const ManageProductNavigationBar = ({
  openState,
  setOpenState,
}: ManageProductNavigationBarProps) => {
  const handleOpenState = () => {
    setOpenState(!openState);
  };

  return (
    <Container>
      <div className={'open-tab'} onClick={handleOpenState}>
        {openState ? (
          <FiChevronDown color={theme.colors.white} />
        ) : (
          <FiChevronUp color={theme.colors.white} />
        )}
      </div>
      <div className={'add-tab'}>
        <AiOutlinePlus />
        <p>Ajouter un produit</p>
      </div>
      <div className={'edit-tab'}>
        <MdModeEditOutline color={theme.colors.white} />
        <p>Modifier un produit</p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  height: 50px;
  font-family: 'Open Sans', sans-serif;
  margin-left: 60px;

  .open-tab,
  .add-tab,
  .edit-tab {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 20px;\
    border-radius: 5px 5px 0 0;
    box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.35);
    cursor: pointer;
  }

  .add-tab {
    background-color: ${theme.colors.white};
    color: ${theme.colors.greyMedium};
  }
  
  .open-tab,
  .edit-tab {
    background-color: ${theme.colors.incognito};
    color: ${theme.colors.white};
  }

  .add-tab, .edit-tab {
    display: inline-flex;
    gap: 10px;
  }
`;
