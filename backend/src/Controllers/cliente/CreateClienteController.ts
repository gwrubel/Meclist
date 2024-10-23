import { Request,Response } from "express";
import { CreateClienteService } from "../../services/cliente/CreateClienteService";

class CreateClienteController {
    async handle(req: Request, res: Response) {

        const { nome, cpf, endereco, celular, email, senha } = req.body;

        const createClienteService = new CreateClienteService();

        const cliente = await createClienteService.execute({
            nome,
            cpf,
            endereco,
            celular,
            email,
            senha
        });

        return res.json(cliente);
    }

}    

export { CreateClienteController };