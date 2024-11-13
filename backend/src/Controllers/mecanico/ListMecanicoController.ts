import { Response, Request } from "express";
import { ListMecanicoService } from "../../services/mecanico/ListMecanicoService";


export class ListMecanicoController {
    async handle(req: Request, res: Response) : Promise<Response> { 
        const listMecanicoService = new ListMecanicoService();

        
        try {
            const mecanicos = await listMecanicoService.execute();
            return res.json(mecanicos);
        } catch (error : Error | any) {
            return res.status(400).json({
                error: error.message
            })
        }
    }
}

export {ListMecanicoService};