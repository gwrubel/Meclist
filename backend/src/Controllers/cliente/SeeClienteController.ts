import { Response, Request } from "express";
import { SeeClienteService } from "../../services/cliente/SeeClienteService";
import { ClienteRepository } from "../../repository/ClienteRepository";

class SeeClienteController{
    async handle (req: Request, res: Response) {
        
        const { id } = req.params;
        const clienteRepository = new ClienteRepository();
        const seeClienteController = new SeeClienteService(clienteRepository);

        try {
            const cliente = await seeClienteController.execute(parseInt(id));
            return res.json (cliente);
        }catch (error : Error | any){
            return res.status(400).json({
                error: error.message
            })
        }
       

        
        
    }
}

export{ SeeClienteController};