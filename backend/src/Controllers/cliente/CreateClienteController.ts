import { Request,Response } from "express";
import { CreateClienteService } from "../../services/cliente/CreateClienteService";
import { ClienteRepository } from "../../repository/ClienteRepository";

class CreateClienteController {
    async handle(req: Request, res: Response) {

        const { nome, cpf, endereco, celular, email, senha } = req.body;

        const clienteRepository = new ClienteRepository();
        const createClienteService = new CreateClienteService(clienteRepository);

        try {
            const cliente = await createClienteService.execute({
                nome,
                cpf,
                endereco,
                celular,
                email,
                senha
            });
    
            

            return res.status(200).json({
                success: true,
                message: 'Cadastro realizado!',
                data: cliente
            })
    
        } catch(error: Error | any){
            return res.status(400).json({
                success: false,
                message: error.message || "Erro ao cadastrar cliente!",
            })
        }
       
    }

}    

export { CreateClienteController };