import { Request,Response } from "express";
import { DetailAdmService } from "../../services/adm/DetailAdmService";



class DetailAdmController{
    async handle(req: Request, res: Response) {

        const user_id = Number(req.user_id )
        

        const detailAdmService = new DetailAdmService();

        const admin = await detailAdmService.execute(user_id)

        return res.json(admin)
    }
}

export { DetailAdmController};