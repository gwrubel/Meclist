import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Checklist.css";

function ChecklistTable() {
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busca, setBusca] = useState("");

  const fetchChecklists = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token ausente");
      return;
    }
    try {
      const response = await fetch("http://localhost:3333/checklist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar checklists");
      }

      const data = await response.json();
      setChecklists(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id_checklist, newStatus) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:3333/checklist/status/${id_checklist}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id_status: newStatus }),
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar o status");
        }

        // Atualizando o status no frontend
        setChecklists((prevChecklists) =>
            prevChecklists.map((checklist) =>
                checklist.id_checklist === id_checklist
                    ? { ...checklist, Status: { ...checklist.Status, id_status: newStatus, descricao: newStatus }}  // Atualiza o status diretamente no checklist
                    : checklist
            )
        );

        toast.success("Status atualizado com sucesso!");
    } catch (err) {
        toast.error("Erro ao atualizar o status: " + err.message);
    }
};


  useEffect(() => {
    fetchChecklists();
  }, []);

  const handleSearch = (event) => {
    setBusca(event.target.value);
  };

  const filteredChecklists = checklists.filter((checklist) =>
    checklist.Veiculo.Cliente.nome.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="checklist-table-container">
      <h1>Checklists</h1>

      <div className="checklist-filters">
        <label>Buscar por cliente: </label>
        <input
          type="text"
          placeholder="Digite o nome do cliente"
          value={busca}
          onChange={handleSearch}
        />
      </div>

      <div className="checklist-table">
        <table>
          <thead>
            <tr>
              <th>N° checklist</th>
              <th>Status</th>
              <th>Nome do Cliente</th>
              <th>Placa do Veículo</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {filteredChecklists.length > 0 ? (
              filteredChecklists.map((checklist) => (
                <tr key={checklist.id_checklist}>
                  <td>{checklist.id_checklist}</td>
                  <td>
                    <select
                      className="status-select"
                      value={checklist.Status.id_status}
                      onChange={(e) =>
                        handleStatusChange(checklist.id_checklist, e.target.value)
                      }
                    >
                      <option value="1">Precificar</option>
                      <option value="2">Aguardando Aprovação</option>
                      <option value="3">Em andamento</option>
                      <option value="4">Concluído</option>
                    </select>
                  </td>
                  <td>{checklist.Veiculo.Cliente.nome}</td>
                  <td>{checklist.Veiculo.placa}</td>
                  <td>{checklist.descricao}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum checklist encontrado.</td>
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

export default ChecklistTable;
