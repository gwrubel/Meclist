import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Importando useState e useEffect
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [selectedCadastro, setSelectedCadastro] = useState(""); // Estado para o select de cadastro
  const [selectedUser, setSelectedUser] = useState(""); // Estado para o select do usuário

  const handleSelectChangeCadastro = (event) => {
    const selectedOption = event.target.value;
    setSelectedCadastro(selectedOption); // Atualiza o estado
    if (selectedOption) {
      navigate(selectedOption); // Redireciona para a rota selecionada
    }
  };

  const handleSelectChangeUser = (event) => {
    const selectedOption = event.target.value;
    setSelectedUser(selectedOption); // Atualiza o estado
    if (selectedOption) {
      navigate(selectedOption); // Redireciona para a rota selecionada
    }
  };

  // Redefinindo o estado quando a rota muda
  useEffect(() => {
    setSelectedCadastro(""); // Reseta o select de cadastro
    setSelectedUser(""); // Reseta o select do usuário
  }, [navigate]);

  return (
    <div className='header-container'>
      <div className='logo-header'>
        <h1 id='logo'>Mec<span>List</span></h1>
      </div>

      <header className="header">
        <div className="nav-container">
          <NavLink to="/dashboard">Início</NavLink>
          <NavLink to="/servicos">Serviços</NavLink>
          <select onChange={handleSelectChangeCadastro} value={selectedCadastro}>
            <option value="" disabled>Cadastro</option>
            <option value="/cadastro-mecanico">Cadastro de Mecânico</option>
            <option value="/cadastro-cliente">Cadastro de Cliente</option>
          </select>
        </div>

        <div className='user'>
          <select onChange={handleSelectChangeUser} value={selectedUser}>
            <option value="" disabled>Nome do usuário</option>   {/* nome do usuario */}
            <option value="/configuracao">Configurações</option>
            <option value="/sair">Sair</option>
          </select>
        </div>
      </header>
    </div>
  );
}

export default Header;
