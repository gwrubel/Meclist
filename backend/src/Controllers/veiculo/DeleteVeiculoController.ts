import  { Response, Request } from "express";
import { DeleteVeiculoService } from "../../services/veiculo/DeleteVeiculoServide";

class DeleteVeiculoController {
    async handle(req: Request, res: Response) {
        const { id_cliente, id_veiculo } = req.params;
        const deleteVeiculoService = new DeleteVeiculoService();

        try {
            await deleteVeiculoService.execute({ id_cliente: Number(id_cliente), id_veiculo: Number(id_veiculo) });
            return res.status(200).json({
                success: true,
                message: 'Veiculo deletado com sucesso!',
            });
        } catch (error: Error | any) {
            return res.status(400).json({
              success: false,
              error: error.message || "Erro ao excluir cadastro",
            });
        }
    }
}   

export { DeleteVeiculoController }