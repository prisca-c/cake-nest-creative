import Routes from './components/Routes.tsx';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Div>
      <Routes />
      <ToastContainer />
    </Div>
  );
}

const Div = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;
