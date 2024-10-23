import { Request, Response } from "express";
import { ListVeiculosClienteService } from "../../services/veiculo/ListVeiculosClienteService";

class ListVeiculosClienteController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const listVeiculosClienteService = new ListVeiculosClienteService();
        const veiculos = await listVeiculosClienteService.execute(Number(id));
        return res.json(veiculos);
    }
}

export { ListVeiculosClienteController };