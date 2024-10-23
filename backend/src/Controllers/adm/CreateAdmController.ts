import { Request,Response } from "express";
import { CreateAdmService } from "../../services/adm/CreateAdmService";

class CreateAdmController {
    async handle (req: Request, res: Response){
        const { nome, email, senha } = req.body;

        const createAdmService = new CreateAdmService();

        const adm = await createAdmService.execute({
            nome,
            email,
            senha
        });

        return res.json(adm);
    }
}

export {CreateAdmController}