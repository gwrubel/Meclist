import { Response, Request } from "express";
import { EditMecanicoService } from "../../services/mecanico/EditMecanicoService";

class EditMecanicoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const  dados  = req.body;
    
    //console.log(dados);

    if (!dados) {
      return res.status(400).json({
        error: "Dados não fornecidos"
      });
    }

    const editMecanicoService = new EditMecanicoService();

    try {
      const edit = await editMecanicoService.execute(parseInt(id), dados);
      return res.status(200).json({
        success: true,
        message: 'Alterações realizadas com sucesso',
        data: edit
      })
    } catch (error: Error | any) {
      return res.status(400).json({
        success: false,
        error: error.message || "Erro ao atualizar cadastro"
      });
    }
  }
}

export { EditMecanicoController };