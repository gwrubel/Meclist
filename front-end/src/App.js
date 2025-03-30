import React from 'react';
import { BrowserRouter } from 'react-router-dom';  // Importar BrowserRouter
import RoutesApp from "./routes";  // Importar seu componente de rotas
import { ToastContainer } from 'react-toastify'; // Importar ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Estilos do Toast
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome, se necessário

function App() {
  return (
    <BrowserRouter>  
      <RoutesApp />
      <ToastContainer />  {/* O ToastContainer aqui */}
    </BrowserRouter>
  );
}

export default App;
