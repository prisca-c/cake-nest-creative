import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';

type ButtonProps = {
  variant: keyof typeof theme.colors;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({ variant, children, onClick }: ButtonProps) => {
  const Button = styled.button`
    background-color: ${theme.colors[variant]};
    color: ${theme.colors.white};
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    display: flex;
    place-items: center;
    gap: 10px;
  `;

  return <Button onClick={onClick}>{children}</Button>;
};
