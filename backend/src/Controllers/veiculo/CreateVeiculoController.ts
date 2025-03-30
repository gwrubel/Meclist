import { Response, Request } from "express";
import { CreateVeiculoService } from "../../services/veiculo/CreateVeiculoService";

class CreateVeiculoController {
  async handle(req: Request, res: Response) {
    const id_cliente = Number(req.params.id);

    // Obtém os dados do corpo da requisição, não dos parâmetros da URL
    const { placa, marca, modelo, ano, cor, quilometragem } = req.body;

    // Converte ano e quilometragem para número
    const anoNumero = Number(ano);
    const quilometragemNumero = Number(quilometragem);

    const createVeiculoService = new CreateVeiculoService();

    try {
      const veiculo = await createVeiculoService.execute({
        id_cliente,
        placa,
        marca,
        modelo,
        ano: anoNumero,
        cor,
        quilometragem: quilometragemNumero,
      });
      return res.status(200).json({
        success: true,
        message: 'Cadastro realizado!',
        data: veiculo
    })
    } catch(error: Error | any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Erro ao cadastrar veiculo!",
      })
    }


    
  }
}

export { CreateVeiculoController }