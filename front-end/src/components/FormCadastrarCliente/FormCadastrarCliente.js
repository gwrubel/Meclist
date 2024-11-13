import React, { useState, useEffect, useRef } from 'react';
import './FormCadastrarCliente.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CelularInput from '../CelularInput/CelularInput';
import CpfInput from '../CpfInput/CpfInput';

function FormCadastrarCliente({ onClose }) {
    const [formData, setFormData] = useState({ nome: '', celular: '', email: '', cpf: '', endereco: '', senha: '', });
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const formRef = useRef(null);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        

        if (formData.senha !== confirmarSenha) {
            setError("As senhas não coincidem");
        } else {

            try {
                const response = await fetch('http://localhost:3333/clientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData), // Remover a chave adicional
                });


                const data = await response.json();
                
                
                if (!response.ok) {
                    throw new Error(data.message || "Erro ao realizar cadastro");
                }

                if (data.success) {
                    toast.success(data.message);
                    onClose();
                }
            } catch (error) {
                toast.error(error.message || "Erro ao realizar cadastro");
            }
        }
    };



    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [onClose]);

    // Fecha o formulário ao clicar fora dele
    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="overlay">
            <div className="formulario-cliente" ref={formRef}>
                <h2>Cadastrar cliente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Celular:</label>
                        <CelularInput
                            name="celular"
                            id="celular"
                            value={formData.celular} // Passando o valor atual do celular
                            onChange={handleFormChange} // Mantendo a lógica de mudança
                            required // Campo obrigatório
                        />
                    </div>

                    <div className="input-container">
                        <label>E-mail:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>CPF:</label>
                        <CpfInput
                            value={formData.cpf}
                            onChange={handleFormChange}
                            name="cpf"
                            id="cpf"
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Endereço:</label>
                        <input
                            type="text"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Senha:</label>
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Confirmar senha:</label>
                        <input
                            type="password"
                            name="confirmarSenha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
                        {error && <p className="error-message">{error}</p>}
                    </div>



                    <div className="form-buttons">
                        <button type="submit" id="enviar">Enviar</button>
                        <button type="button" id="cancelar" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default FormCadastrarCliente;