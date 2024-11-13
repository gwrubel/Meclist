import React, { useState, useEffect, useRef, useCallback } from 'react';
import './FormEditarMecanico.css';
import CelularInput from '../CelularInput/CelularInput';
import { toast } from 'react-toastify';

function FormEditarMecanico({ id_mecanico, onClose, onSucces }) {
    const [formData, setFormData] = useState({});
    const formRef = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id_mecanico) {
            const buscarDados = async () => {
                try {
                    const response = await fetch(`http://localhost:3333/mecanicos/${id_mecanico}`);
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
    }, [id_mecanico]);

    


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
            const response = await fetch(`http://localhost:3333/mecanicos/${id_mecanico}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Erro ao atualizar mecânico");
                throw new Error(data.error );
            }

            onSucces(data.message || "Cadastro atualizado com sucesso!");
            onClose();

        } catch (error) {
            if (error instanceof Error) {
                console.error("Erro ao atualizar:", error.message);
            } else {
                console.error("Erro desconhecido ao atualizar:", error);
            }
        }
    };

    const apagarMecanico = async (id_mecanico) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token ausente");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3333/mecanicos/${id_mecanico}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao apagar mecânico");
            }

            onSucces(data.message || "Mecânico excluído com sucesso!");
            onClose();

        } catch (error) {
            console.error("Erro ao apagar:", error.message);
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
        <>
            <div className="overlay">
                <div className="formulario-mecanico" ref={formRef}>
                    <div className="cabecalho-edit">
                        <h2>Editar Mecânico</h2>
                        <button id='excluir-mecanico' onClick={() => apagarMecanico(id_mecanico)}>
                            <span>excluir</span>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-container-edit">
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome || ''}
                                onChange={handleFormChange}
                                required
                            />
                        </div>

                        <div className="input-container-edit">
                            <label>Celular:</label>
                            <CelularInput
                                name="celular"
                                id="celular"
                                value={formData.celular || ''} // Use a string vazia se não houver valor
                                onChange={handleCelularChange} // Passa a nova função para tratar mudanças
                                required
                            />
                        </div>

                        <div className="input-container-edit">
                            <label>E-mail:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
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
        </>
    );
}

export default FormEditarMecanico;
