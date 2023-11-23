import styled from 'styled-components';
import { theme } from '~@/theme';

type TurnAdminModeButtonProps = {
  active: boolean;
  onClick: () => void;
};

export const TurnAdminModeButton = ({
  active,
  onClick,
}: TurnAdminModeButtonProps) => {
  const text = active ? 'Désactiver' : 'Activer';
  const handleClassActive = () => {
    return active ? 'active' : '';
  };

  return (
    <AdminButton
      $active={active}
      onClick={onClick}
      className={handleClassActive()}
    >
      <Circle $active={active} className={handleClassActive()} />
      <p>{text} le mode admin</p>
    </AdminButton>
  );
};

const AdminButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: block;
  gap: 5px;
  background-color: ${theme.colors.incognito};
  border-radius: 100px;
  padding: 0;
  color: ${({ $active }) =>
    $active ? theme.colors.primary : theme.colors.red};
  text-transform: uppercase;
  border: none;
  transition: all 0.2s ease-in-out;
  width: 200px;
  height: 34px;

  p {
    position: absolute;
    font-size: 0.6rem;
    font-weight: 600;
    padding: 0 15px 0 0;
    transform: translateY(-50%);
    top: 50%;
    right: 0;
    transition: all 0.3s ease-in-out;
  }

  &.active p {
    right: 15px;
    left: 0;
  }
`;

const Circle = styled.div<{ $active: boolean }>`
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${({ $active }) =>
    $active ? theme.colors.primary : theme.colors.red};
  border: 4px solid ${theme.colors.incognito};
  transition: all 0.3s ease-in-out;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  &.active {
    left: calc(100% - 34px);
  }
`;
