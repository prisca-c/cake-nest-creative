import styled from 'styled-components';

export const DivCenter = styled.div<{ $height?: string; $width?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || 'auto'};
`;
