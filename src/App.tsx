import Routes from './components/Routes.tsx';
import styled from 'styled-components';

export default function App() {
  return (
    <Div>
      <Routes />
    </Div>
  );
}

const Div = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;
