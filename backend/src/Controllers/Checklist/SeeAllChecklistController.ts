import { Response, Request } from "express";
import { SeeAllChecklistService } from "../../services/Checklist/SeeAllChecklistService";


class  SeeAllChecklistController {
    async handle(req: Request, res: Response) {
       
            const seeAllChecklistController = new SeeAllChecklistService();

        
            try {
                const checklists = await seeAllChecklistController.execute();
                return res.json(checklists);
            } catch (error : Error | any) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    }


export { SeeAllChecklistController };