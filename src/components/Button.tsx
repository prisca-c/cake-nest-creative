import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';

type ButtonProps = {
  variant: keyof typeof theme.colors;
  children: React.ReactNode;
  width: string;
  onClick?: () => void;
  textAlign?: string;
};

export const Button = ({
  variant,
  children,
  onClick,
  width,
  textAlign = 'center',
}: ButtonProps) => {
  return (
    <ButtonStyle
      $width={width}
      onClick={onClick}
      $textAlign={textAlign}
      $variant={variant}
    >
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<{
  $variant: keyof typeof theme.colors;
  $width: string;
  $textAlign: string;
}>`
  background-color: ${({ $variant }) => theme.colors[$variant]};
  color: ${theme.colors.white};
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width};
  text-align: ${({ $textAlign }) => $textAlign};
`;
