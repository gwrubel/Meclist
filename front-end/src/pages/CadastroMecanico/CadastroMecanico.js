import React, { useEffect, useState } from "react";
import "./CadastroMecanico.css";
import FormularioMecanico from "../../components/FormCadastrarMecanico/FormularioMecanico";
import FormEditarMecanico from "../../components/FormEditarMecanico/FormEditarMecanico";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CadastroMecanico() {
  const [mecanicos, setMecanicos] = useState([]); // Estado para armazenar os mecânicos
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
  const [error, setError] = useState(null); // Estado para armazenar possíveis erros
  const [situacao, setSituacao] = useState(""); // Estado para armazenar o filtro de situação
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
  const [isFormVisible, setIsFormVisible] = useState(false); // Estado para controle do formulário
  const [mecanicoSelecionado, setMecanicoSelecionado] = useState(null); // Estado para armazenar o mecânico selecionado

  // Função para buscar dados da API
  const buscarMecanicos = async () => {
    try {
      const response = await fetch("http://localhost:3333/mecanicos");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }
      const data = await response.json();

      setMecanicos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarMecanicos();
  }, []);

  // Função para manipular a mudança de situação
  const handleSituacaoChange = (event) => {
    setSituacao(event.target.value);
  };

  // Função para manipular a busca pelo nome
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Função para abrir o formulário de edição
  const editarMecanicos = (mecanico) => {
    setMecanicoSelecionado(mecanico);
    setIsFormVisible(true);
  };

  // Função para fechar o formulário e resetar o mecânico selecionado
  const fecharFormulario = () => {
    setIsFormVisible(false);
    setMecanicoSelecionado(null);
    buscarMecanicos();
  };

  const notSuccess = (message) => {
    toast.success(message);
    fecharFormulario(); // Fechar o formulário
  };

  // Renderização condicional
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Filtrando mecânicos com base no termo de busca e situação
  const filteredMecanicos = mecanicos.filter((mecanico) => {
    const matchesSituacao = situacao
      ? mecanico.ativo === (situacao === "Ativo")
      : true;
    const matchesSearchTerm = mecanico.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSituacao && matchesSearchTerm;
  });

  return (
    <div className="cadastro-mecanico-container">
      <h1>Mecânicos</h1>

      <div className="mecanico-options">
        <button onClick={() => setIsFormVisible(true)}>
          <i className="fa fa-user-plus" aria-hidden="true"></i>
          Cadastrar Mecânico
        </button>
      </div>

      {isFormVisible && (
        <div className="overlay">
          {mecanicoSelecionado ? (
            <FormEditarMecanico
              id_mecanico={mecanicoSelecionado.id_mecanico}
              onClose={fecharFormulario}
              onSucces={notSuccess}
            />
          ) : (
            <FormularioMecanico onClose={fecharFormulario} />
          )}
        </div>
      )}

      <div className="mecanico-filtros">
        <label>Situação: </label>
        <select value={situacao} onChange={handleSituacaoChange}>
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
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="mecanico-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Celular</th>
              <th>E-mail</th>
              <th>Ativo</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {filteredMecanicos.length > 0 ? (
              filteredMecanicos.map((mecanico) => (
                <tr key={mecanico.id_mecanico}>
                  <td>{mecanico.nome}</td>
                  <td>{mecanico.celular}</td>
                  <td>{mecanico.email}</td>
                  <td>{mecanico.ativo ? "Sim" : "Não"}</td>
                  <td className="coluna-edit">
                    <button
                      onClick={() => editarMecanicos(mecanico)}
                      id="editar"
                    >
                      <i className="fa fa-pen-to-square"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum mecânico encontrado.</td>
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

export default CadastroMecanico;
