import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';

type ButtonProps = {
  variant: keyof typeof theme.colors;
  children: React.ReactNode;
  width: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  textAlign?: string;
  active?: boolean;
  disabled?: boolean;
  padded?: boolean;
};

export const Button = ({
  variant,
  children,
  onClick,
  width,
  textAlign = 'center',
  active = false,
  disabled = false,
  padded = true,
}: ButtonProps) => {
  const type = onClick ? 'button' : 'submit';
  return (
    <ButtonStyle
      $width={width}
      onClick={onClick}
      $textAlign={textAlign}
      $variant={variant}
      $active={active}
      $padded={padded}
      disabled={disabled}
      type={type}
    >
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<{
  $variant: keyof typeof theme.colors;
  $width: string;
  $textAlign: string;
  $active: boolean;
  $padded: boolean;
}>`
  background-color: ${({ $active, $variant }) =>
    $active ? theme.colors.white : theme.colors[$variant]};
  color: ${({ $active }) =>
    $active ? theme.colors.primary : theme.colors.white};
  border: 1px solid
    ${({ $active }) => ($active ? theme.colors.primary : theme.colors.white)};
  border-radius: 5px;
  padding: ${({ $padded }) => ($padded ? '15px 25px' : '10px')};
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width};
  text-align: ${({ $textAlign }) => $textAlign};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.colors.white};
    color: ${({ $variant }) => theme.colors[$variant]};
    outline: 1px solid ${({ $variant }) => theme.colors[$variant]};
  }

  &:disabled {
    background-color: ${theme.colors.greyLight};
    color: ${theme.colors.greyDark};
    border: 1px solid ${theme.colors.greyLight};
    cursor: not-allowed;
  }
`;
