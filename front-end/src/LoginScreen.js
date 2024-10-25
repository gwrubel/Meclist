import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import './LoginScreen.css';

function LoginScreen() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">Mec<span>List</span></h1>
        <form>
          <div className="input-group">
            <FiMail className="login-icon" />
            <input type="email" placeholder="E-mail*" required />
          </div>
          <div className="input-group">
            <FiLock className="login-icon" />
            <input type="password" placeholder="Senha*" required />
          </div>
          <button type="submit" className="login-btn">ENTRAR</button>
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