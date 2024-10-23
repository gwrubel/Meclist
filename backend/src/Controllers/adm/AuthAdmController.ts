import { Request, Response } from "express";   
import { AuthAdmService } from "../../services/adm/AuthAdmService";

export class AuthAdmController {
    async handle(req: Request, res: Response) {
        const { email, senha } = req.body;

        const authAdmService = new AuthAdmService();
        const adm = await authAdmService.execute({
            email,
            senha
        });

        return res.json(adm);
    }
}