import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


import LoginScreen from "./pages/Login/LoginScreen";
import Dashboard from "./pages/Home/Dashboard";
import Header from "./components/Header/Header";
import CadastroMecanico from "./pages/CadastroMecanico/CadastroMecanico";
import PrivateRoute from "./PrivateRoute";
import CadastroCliente from "./pages/CadastroCliente/CadastroCliente";
import Veiculos from "./pages/Veiculos/Veiculos";
import Checklist from "./pages/Checklist/Checklist";

function RoutesApp() {


    return (


        <div>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Header />
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cadastro-mecanico"
                    element={
                        <PrivateRoute>
                            <Header />
                            <CadastroMecanico />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cadastro-cliente"
                    element={
                        <PrivateRoute>
                            <Header />
                            <CadastroCliente />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/Checklist"
                    element={
                        <PrivateRoute>
                            <Header />
                            <Checklist />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/:id_cliente/veiculos"
                    element={
                        <PrivateRoute>
                            <Header />
                            <Veiculos />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>


    );
}

export default RoutesApp;
