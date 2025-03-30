import prismaClient from "../../prisma";

interface ChecklistRequest {
    id_checklist: number;
    id_status: number; 
}

class AlterStatusService {
    async execute({ id_checklist, id_status }: ChecklistRequest) {


        if (id_status === 0 || id_status === 1 || id_status === 2 || id_status === 3 || id_status === 4) {
            const checklist = await prismaClient.checklist.update({
                where: {
                    id_checklist: id_checklist,
                },
                data: {
                    id_status: id_status, // Atualizando o status usando o ID
                },
            });
    
           
            return checklist;
        }else{
            throw new Error("Status inválido");
        }
        
    
       
    }
}

export { AlterStatusService };
