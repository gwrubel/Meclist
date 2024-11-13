import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [verSenha, setVerSenha] = useState(false);

  const alterarVisibilidade = () => {
    setVerSenha(!verSenha);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3333/adm/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Erro ao realizar login');
        }

        const data = await response.json();
        const token = data.data.token;

        // Armazena o token no localStorage
        localStorage.setItem("token", token);

        if (data.success) {
            console.log('Login bem-sucedido!', data);

            // Redireciona o usuário para o dashboard
            navigate('/dashboard');
        } else {
            setErrorMessage(data.message || 'Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro:', error.message);
        setErrorMessage(error.message || 'Erro ao conectar ao servidor');
    }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">Mec<span>List</span></h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FiMail className="login-icon" />
            <input
              type=""
              placeholder="E-mail*"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FiLock className="login-icon" />
            <input
          type={verSenha ? "text" : "password"} // Alterna o tipo
          id="password"
          placeholder='Senha*'
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button
          type="button"
          id='verSenha'
          onClick={alterarVisibilidade}
        >
          {verSenha ? <FaEyeSlash /> : <FaEye />} {/* Ícone para ver ou ocultar */}
        </button>
          </div>
          <button type="submit" className="login-btn">ENTRAR</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="login-options">
            <label>
              <input type="checkbox" /> Mantenha-me conectado
            </label>
            <a href="#">Esqueceu a senha?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
