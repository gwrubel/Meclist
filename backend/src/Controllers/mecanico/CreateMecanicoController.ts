import { Request, Response } from "express";
import { CreateMecanicoService } from "../../services/mecanico/CreateMecanicoService";

class CreateMecanicoController {
    async handle(req: Request, res: Response) {
        const { nome, email, celular, senha } = req.body;

        const createMecanicoService = new CreateMecanicoService();

        const mecanico = await createMecanicoService.execute({
            nome,
            email,            
            celular,
            senha
        }
    );

        return res.json(mecanico);
    }
}

export { CreateMecanicoController }

