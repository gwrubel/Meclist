import { Response, Request } from "express";
import { ListClienteService } from "../../services/cliente/ListClienteService";
import { ClienteRepository } from "../../repository/ClienteRepository";



export class ListClientController {
    async handle(req: Request, res: Response) : Promise<Response> { 

        const clienteRepository = new ClienteRepository();
        const listClienteService = new ListClienteService(clienteRepository);

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