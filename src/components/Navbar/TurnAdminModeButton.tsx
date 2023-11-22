import styled from 'styled-components';
import { theme } from '../../theme';

type TurnAdminModeButtonProps = {
  active: boolean;
  onClick: () => void;
};

export const TurnAdminModeButton = ({
  active,
  onClick,
}: TurnAdminModeButtonProps) => {
  const text = active ? 'Désactiver' : 'Activer';
  return (
    <AdminButton $active={active} onClick={onClick}>
      <Circle $active={active} />
      <p>{text} le mode admin</p>
    </AdminButton>
  );
};

const AdminButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  p {
    font-size: 0.6rem;
    font-weight: 600;
    padding: 0 15px 0 0;
  }
`;

const Circle = styled.div<{ $active: boolean }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${({ $active }) =>
    $active ? theme.colors.primary : theme.colors.red};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  border: 4px solid ${theme.colors.incognito};
  transition: all 0.2s ease-in-out;
`;
