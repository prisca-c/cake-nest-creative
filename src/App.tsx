import Routes from '~@/Routes.tsx';
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

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;
