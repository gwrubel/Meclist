import { Response, Request } from "express";
import { SeeMecanicoService } from "../../services/mecanico/SeeMecanicoService";

class SeeMecanicoController{
    async handle (req: Request, res: Response) {
        
        const { id } = req.params;
        const seeMecanicoController = new SeeMecanicoService();

        try {
            const mecanico = await seeMecanicoController.execute(parseInt(id));
            return res.json (mecanico);
        }catch (error : Error | any){
            return res.status(400).json({
                error: error.message
            })
        }
       

        
        
    }
}

export{ SeeMecanicoController};