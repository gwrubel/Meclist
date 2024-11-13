import { Response, Request } from "express";
import { EditClienteService } from "../../services/cliente/EditClienteService";

class EditClienteController {

    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const dados = req.body;

        if (!dados) {
            return res.status(400).json({
                success: false,
                error: "Dados não fornecidos"
            });
        }

        const editClienteService = new EditClienteService();

        try {
            // Verifica se o ID é um número válido
            const clienteId = parseInt(id);
            if (isNaN(clienteId)) {
                return res.status(400).json({
                    success: false,
                    error: "ID inválido"
                });
            }

            // Chama o serviço de edição
            const edit = await editClienteService.execute(clienteId, dados);

            return res.status(200).json({
                success: true,
                message: 'Alterações realizadas com sucesso',
                data: edit
            });
        } catch (error: any) {
            
            return res.status(400).json({
                success: false,
                error: error.message || "Erro ao atualizar cadastro"
            });
        }
    }
    
}

export { EditClienteController };
