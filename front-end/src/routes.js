import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginScreen from "./pages/Login/LoginScreen";
import Dashboard from "./pages/Home/Dashboard";
import Header from "./components/Header/Header";
import CadastroMecanico from "./pages/CadastroMecanico/CadastroMecanico";
import PrivateRoute from "./PrivateRoute";
import CadastroCliente from "./pages/CadastroCliente/CadastroCliente";


function RoutesApp() {
    return (
        <BrowserRouter>
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

            </Routes>

        </BrowserRouter>
    )
}

export default RoutesApp;