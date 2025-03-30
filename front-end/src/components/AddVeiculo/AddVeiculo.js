import React, { useState, useEffect, useRef } from 'react';
import './AddVeiculo.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddVeiculo({ cliente, onClose }) {
    

    const [formData, setFormData] = useState({
        placa: '',
        marca: '',
        modelo: '',
        ano: '',
        cor: '',
        quilometragem: '',
    });

    const formRef = useRef(null);
    const [error, setError] = useState('');

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validação personalizada (exemplo: ano deve ser numérico e positivo)
        if (isNaN(formData.ano) || formData.ano <= 0) {
            setError('O ano deve ser um número positivo.');
            return;
        }

        try {
            
            const response = await fetch(`http://localhost:3333/clientes/${cliente.id_cliente}/veiculos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            
            if (!response.ok) {
                
                throw new Error(data.message || 'Erro ao realizar cadastro');
            }

            if (data.success) {
                toast.success(data.message);
                onClose();
            }
        } catch (error) {
            toast.error(error.message || 'Erro ao realizar cadastro');
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
            <div className="add-veiculo-form" ref={formRef}>
                <h2>Cadastrar Veículo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Placa:</label>
                        <input
                            type="text"
                            name="placa"
                            value={formData.placa}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Marca:</label>
                        <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Modelo:</label>
                        <input
                            type="text"
                            name="modelo"
                            value={formData.modelo}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Ano:</label>
                        <input
                            type="number"
                            name="ano"
                            value={formData.ano}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Cor:</label>
                        <input
                            type="text"
                            name="cor"
                            value={formData.cor}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Quilometragem:</label>
                        <input
                            type="number"
                            name="quilometragem"
                            value={formData.quilometragem}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="form-buttons">
                        <button type="submit" id="enviar">Enviar</button>
                        <button type="button" id="cancelar" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddVeiculo;
