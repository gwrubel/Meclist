import { Request, Response } from "express";
import { CreateMecanicoService } from "../../services/mecanico/CreateMecanicoService";

class CreateMecanicoController {
    async handle(req: Request, res: Response) {
        const { nome, email, celular, senha } = req.body;

        const createMecanicoService = new CreateMecanicoService();

        try {
            const mecanico = await createMecanicoService.execute({
                nome,
                email,            
                celular,
                senha
            });

            return res.status(200).json({
                success: true,
                message: 'Cadastro realizado!',
                data: mecanico
            })
    
        } catch(error: Error | any){
            return res.status(400).json({
                success: false,
                message: error.message || "Erro ao cadastrar mecanico!",
            })
        }
    }
}

export { CreateMecanicoController }

