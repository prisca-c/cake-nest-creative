import styled from 'styled-components';

type LogoProps = {
  width?: string;
  onClick?: () => void;
};

export const Logo = ({ width, onClick }: LogoProps) => {
  return (
    <LogoStyle
      src="/src/assets/images/cupcake.png"
      alt="logo"
      width={width}
      onClick={onClick}
      cursorPointer={!!onClick}
    />
  );
};

const LogoStyle = styled.img<{
  width?: string;
  cursorPointer?: boolean;
}>`
  width: ${(props) => props.width || '50px'};
  cursor: ${(props) => (props.cursorPointer ? 'pointer' : 'default')};
`;
