import { Response, Request } from "express";
import { ListClienteService } from "../../services/cliente/ListClienteService";



export class ListClientController {
    async handle(req: Request, res: Response) : Promise<Response> { 
        const listClienteService = new ListClienteService();

        try {
            const clientes = await listClienteService.execute();
            return res.json(clientes);
        } catch (error : Error | any) {
            return res.status(400).json({
                error: error.message
            })
        }
    }
}