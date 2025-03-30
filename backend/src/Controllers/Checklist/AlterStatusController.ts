import { Response, Request } from "express";
import { AlterStatusService } from "../../services/Checklist/AlterStatusService";
import e from "cors";


class AlterStatusController {
    async handle(req: Request, res: Response) {
        const { id_checklist } = req.params;
        const {  id_status } = req.body;

      
      const alterStatusService = new AlterStatusService();

      try {
        const alterStatus = await alterStatusService.execute({
          id_checklist: Number(id_checklist),
          id_status: Number(id_status),
        });

       return res.status(200).json({
           success: true,
           message: 'Status alterado com sucesso!',
           data: alterStatus
       })
      } catch (error: Error | any) {
        return res.status(400).json({
          success: false,
          error: error.message || "Erro ao alterar status do checklist",
        });
      }
    }}

    export { AlterStatusController };