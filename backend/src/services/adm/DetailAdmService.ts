import prismaClient from "../../prisma";

class DetailAdmService{
    async execute(user_id: number){

        const adm = await prismaClient.admin.findFirst({
            where: {
                id_adm : user_id
            }, select:{
                id_adm : true,
                nome : true,
                email: true,
            }
        })
        
        return adm;
    }

}

export { DetailAdmService};