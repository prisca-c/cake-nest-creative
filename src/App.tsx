import Routes from './components/Routes.tsx';
import styled from 'styled-components';

function App() {
  const Div = styled.div`
    height: 100vh;
    width: 100vw;
  `;

  return (
    <Div>
      <Routes />
    </Div>
  );
}

export default App;
