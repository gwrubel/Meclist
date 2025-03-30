import React, { useState, useEffect, useRef, useCallback } from 'react';

import CelularInput from '../CelularInput/CelularInput';
import CpfInput from '../CpfInput/CpfInput';
import { toast } from 'react-toastify';

function FormEditarCliente({ id_cliente, onClose, onSuccess }) {
    const [formData, setFormData] = useState({});
    const formRef = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id_cliente) {
            const buscarDados = async () => {
                try {
                    const response = await fetch(`http://localhost:3333/clientes/${id_cliente}`);
                    if (!response.ok) {
                        throw new Error('Erro ao buscar dados');
                    }
                    const data = await response.json();
                    setFormData(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            buscarDados();
        }
    }, [id_cliente]);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCelularChange = (event) => {
        const { value } = event.target;
        setFormData({ ...formData, celular: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token ausente");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3333/clientes/${id_cliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            
            if (!response.ok) {
                toast.error(data.error || "Erro ao atualizar cliente"); // Usando a mensagem de erro retornada
                throw new Error(data.error);
            }
            
            onSuccess(data.message || "Cadastro atualizado com sucesso!");
            onClose();
    
        } catch (error) {
            if (error instanceof Error) {
                console.error("Erro ao atualizar:", error.message);
            } else {
                console.error("Erro desconhecido ao atualizar:", error);
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
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [onClose]);

    const handleClickOutside = useCallback((event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div className="overlay">
            <div className="formulario-cliente" ref={formRef}>
                <h2>Editar Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome || ''}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Celular:</label>
                        <CelularInput
                            name="celular"
                            id="celular"
                            value={formData.celular || ''}
                            onChange={handleCelularChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>E-mail:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>CPF:</label>
                        <CpfInput
                            name="cpf"
                            id="cpf"
                            value={formData.cpf || ''}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Endereço:</label>
                        <input
                            type="text"
                            name="endereco"
                            value={formData.endereco || ''}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className="input-container-edit">
                            <label>Status:</label>
                            <select
                                name="ativo"
                                value={formData.ativo ? "true" : "false"}
                                onChange={(e) => setFormData({ ...formData, ativo: e.target.value === "true" })}
                                required
                            >
                                <option value="true">Ativo</option>
                                <option value="false">Inativo</option>
                            </select>
                        </div>

                    <div className="form-buttons">
                        <button type="submit" id="salvar">Salvar Alterações</button>
                        <button type="button" id="cancelar" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormEditarCliente;
