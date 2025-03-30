import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Veiculos.css';

function Veiculos() {
  const { id_cliente } = useParams(); // Captura o ID do cliente
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token ausente");
        }

        const response = await fetch(`http://localhost:3333/clientes/${id_cliente}/veiculos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar veículos");
        }

        const data = await response.json();
        setVeiculos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVeiculos();
  }, [id_cliente]); // Atualiza quando o ID do cliente muda

  if (loading) {
    return <div>Carregando veículos...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="veiculos-wrapper">
      <div className="veiculos-page">
        {/* Exibe o título com o nome do cliente apenas se houver veículos */}
        {veiculos.length > 0 ? (
          <h1>Veículos de {veiculos[0]?.Cliente?.nome}</h1>
        ) : (
          <h1>Este cliente não possui veículos cadastrados.</h1>
        )}
        
        {veiculos.length > 0 ? (
          <table className='veiculos-table'>
            <thead>
              <tr>
                <th>Placa</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Cor</th>
                <th>Quilometragem</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {veiculos.map((veiculo) => (
                <tr key={veiculo.id_veiculo}>
                  <td>{veiculo.placa}</td>
                  <td>{veiculo.marca}</td>
                  <td>{veiculo.modelo}</td>
                  <td>{veiculo.ano}</td>
                  <td>{veiculo.cor}</td>
                  <td>{veiculo.quilometragem} km</td>
                  <td><i className="fa fa-trash" id='excluir-veiculo'></i></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}

export default Veiculos;


