import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './CadastroCliente.css';
import FormCadastrarCliente from '../../components/FormCadastrarCliente/FormCadastrarCliente';
import FormEditarCliente from '../../components/FormEditarCliente/FormEditarCliente';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddVeiculo from '../../components/AddVeiculo/AddVeiculo';

function CadastroCliente() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [situacao, setSituacao] = useState("");
  const [busca, setBusca] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false); // Controle do formulário de cliente
  const [isAddVeiculoVisible, setIsAddVeiculoVisible] = useState(false); // Controle do formulário de veículo
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const buscarClientes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token ausente");
      return;
    }
    try {
      const response = await fetch("http://localhost:3333/clientes", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }
      const data = await response.json();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  const handleSearch = (event) => {
    setBusca(event.target.value);
  };

  const filteredClientes = clientes.filter((cliente) => {
    const matchesSituacao = situacao
      ? cliente.ativo === (situacao === "Ativo")
      : true;
    const matchesSearchTerm = cliente.nome
      .toLowerCase()
      .includes(busca.toLowerCase());
    return matchesSituacao && matchesSearchTerm;
  });

  const fecharFormulario = () => {
    setIsFormVisible(false);
    setClienteSelecionado(null);
    buscarClientes();
  };

  const abrirAddVeiculo = (cliente) => {
    setClienteSelecionado(cliente);
    setIsAddVeiculoVisible(true);
  };

  const fecharAddVeiculo = () => {
    setIsAddVeiculoVisible(false);
    setClienteSelecionado(null);
    buscarClientes();
  };

  const notSuccess = (message) => {
    toast.success(message);
    fecharFormulario();
  };

  const editarCliente = (cliente) => {
    setClienteSelecionado(cliente);
    setIsFormVisible(true);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className='cadastro-cliente-container'>
      <h1>Clientes</h1>

      <div className='cliente-options'>
        <button onClick={() => setIsFormVisible(true)}>
          <i className="fa fa-user-plus" aria-hidden="true"></i>
          Cadastrar Cliente
        </button>
      </div>

      {isFormVisible && (
        <div className="overlay">
          {clienteSelecionado ? (
            <FormEditarCliente
              id_cliente={clienteSelecionado.id_cliente}
              onClose={fecharFormulario}
              onSuccess={notSuccess}
            />
          ) : (
            <FormCadastrarCliente onClose={fecharFormulario} />
          )}
        </div>
      )}

      {isAddVeiculoVisible && clienteSelecionado && (
        <div className="overlay">
          <AddVeiculo
            cliente={clienteSelecionado} // Passando o id_cliente completo
            onClose={fecharAddVeiculo} // Função para fechar o modal
          />
        </div>
      )}

      <div className="cliente-filtros">
        <label>Situação: </label>
        <select value={situacao} onChange={(event) => setSituacao(event.target.value)}>
          <option value="" disabled>
            Selecione
          </option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>

        <label>Buscar: </label>
        <input
          type="text"
          placeholder="Buscar por nome"
          value={busca}
          onChange={handleSearch}
        />
      </div>

      <div className="cliente-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Veículos</th>
              <th>Celular</th>
              <th>E-mail</th>
              <th>Ativo</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <tr key={cliente.id_cliente}>
                  <td id='nome-cliente'>
                    <Link to={`/${cliente.id_cliente}/veiculos`}>{cliente.nome}</Link>
                  </td>
                  <td id='coluna-veiculos'>
                    <Link to={`/${cliente.id_cliente}/veiculos`}>{cliente._count.veiculos}</Link>
                    <div className="add-veiculo">
                      <button onClick={() => abrirAddVeiculo(cliente)} id='add-veiculo'>
                        <i className="fas fa-car"></i> <i className="fas fa-plus-circle"></i>
                      </button>
                    </div>
                  </td>
                  <td>{cliente.celular}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.ativo ? "Sim" : "Não"}</td>
                  <td className="coluna-edit">
                    <button
                      onClick={() => editarCliente(cliente)}
                      id='editar'
                    >
                      <i className="fa fa-pen-to-square"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Nenhum cliente encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default CadastroCliente;
