
import React from 'react';
import './Alert.css'; // Importar o CSS para estilização

const Alert = ({ message, onClose }) => {
    return (
        <div className="alert-overlay" onClick={onClose}>
            <div className="alert-box">
                <h3>Alerta</h3>
                <p>{message}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default Alert;
