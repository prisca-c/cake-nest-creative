import styled from 'styled-components';

type LogoProps = {
  width?: string;
};

export const Logo = ({ width }: LogoProps) => {
  return <LogoStyle src="/images/cupcake.png" alt="logo" $width={width} />;
};

const LogoStyle = styled.img<{
  $width?: string;
}>`
  width: ${(props) => props.$width || '50px'};
`;
