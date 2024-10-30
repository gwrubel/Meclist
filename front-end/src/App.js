import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesApp from "./routes";

function App() {
  return (
    <>
      <RoutesApp />
      <ToastContainer /> {/* Adicione o ToastContainer aqui */}
    </>
  );
}

export default App;
