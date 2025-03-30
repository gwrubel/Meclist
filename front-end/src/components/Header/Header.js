import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';
import { jwtDecode } from 'jwt-decode';

function Header() {
  const navigate = useNavigate();
  const [nome, setnome] = useState('');
  
  // State para gerenciar os dropdowns
  const [isCadastroOpen, setCadastroOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setnome(decodedToken.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserOpen(false);
    navigate("/"); 
  };

  const handleOptionClick = (option) => {
    navigate(option);
    setCadastroOpen(false); // Fecha o dropdown após selecionar
  };

  const handleUserOptionClick = (option) => {
    if (option === "/sair") {
      handleLogout();
    } else {
      navigate(option);
    }
    setUserOpen(false); // Fecha o dropdown após selecionar
  };

  return (
    <div className='header-container'>
      <div className='logo-header'>
        <h1 id='logo'>Mec<span>List</span></h1>
      </div>

      <header className="header">
        <div className="nav-container">
          <NavLink to="/dashboard">Início</NavLink>
          <NavLink to="/checklist">Checklist</NavLink>

          <div className="dropdown">
            <button onClick={() => setCadastroOpen(!isCadastroOpen)}>
              Cadastro
            </button>
            {isCadastroOpen && (
              <div className="dropdown-menu">
                <div onClick={() => handleOptionClick("/cadastro-mecanico")}>Cadastro de Mecânico</div>
                <div onClick={() => handleOptionClick("/cadastro-cliente")}>Cadastro de Cliente</div>
              </div>
            )}
          </div>
        </div>

        <div className='user'>
          <div className="dropdown">
            <button onClick={() => setUserOpen(!isUserOpen)}>
              {nome || "Usuário"}
            </button>
            {isUserOpen && (
              <div className="dropdown-menu">
                <div onClick={() => handleUserOptionClick("/configuracao")}>Configurações</div>
                <div onClick={() => handleUserOptionClick("/sair")}>Sair</div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
