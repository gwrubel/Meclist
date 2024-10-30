import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/adm/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao realizar login');
      }
      
      
      if (data.success) {
        console.log('Login bem-sucedido!', data);
        // Aqui você pode redirecionar o usuário ou salvar o token no localStorage

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
              type="email"
              placeholder="E-mail*"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FiLock className="login-icon" />
            <input
              type="password"
              placeholder="Senha*"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
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
