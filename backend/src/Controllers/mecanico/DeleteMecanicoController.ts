import  { Response, Request } from "express";
import { DeleteMecanicoService } from "../../services/mecanico/DeleteMecanicoService";

class DeleteMecanicoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const deleteMecanicoService = new DeleteMecanicoService();

        try {
            await deleteMecanicoService.execute(Number(id));
            return res.status(200).json({
                success: true,
                message: 'Mecanico deletado com sucesso!',
            });
        } catch (error: Error | any) {
            return res.status(400).json({
              success: false,
              error: error.message || "Erro ao excluir cadastro",
            });
    }
}
}

export { DeleteMecanicoController }