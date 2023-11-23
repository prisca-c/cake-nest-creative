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
  padding: 15px 25px;
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
`;
