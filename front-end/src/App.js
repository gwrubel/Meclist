import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesApp from "./routes";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <>
      <RoutesApp />
      <ToastContainer /> {/* Adicione o ToastContainer aqui */}
    </>
  );
}

export default App;
