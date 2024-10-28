import { Request, Response } from "express";   
import { AuthAdmService } from "../../services/adm/AuthAdmService";

export class AuthAdmController {
    async handle(req: Request, res: Response) {
        const { email, senha } = req.body;

        const authAdmService = new AuthAdmService();


        try{
            const adm = await authAdmService.execute({
                email,
                senha
            });

            return res.status(200).json({
                success: true,
                message: 'Login realizado com sucesso',
                data: adm
            })
        }catch(error: Error | any){
            return res.status(400).json({
                success: false,
                message: error.message || "Email ou senha inválidos",
            })
        }
       

       
    }
}