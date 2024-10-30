import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginScreen from "./pages/Login/LoginScreen";
import Dashboard from "./pages/Home/Dashboard";
import Header from "./components/Header/Header";
import CadastroMecanico from "./pages/CadastroMecanico/CadastroMecanico";


function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route
                    path="/dashboard"
                    element={<>
                        <Header />
                        <Dashboard /></>}
                />

                <Route
                    path="/cadastro-mecanico"
                    element={<>
                        <Header />
                        <CadastroMecanico /></>}
                />

            </Routes>

        </BrowserRouter>
    )
}

export default RoutesApp;