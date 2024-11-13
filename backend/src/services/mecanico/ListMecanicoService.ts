import prismaClient from "../../prisma";


class ListMecanicoService {

    async execute() {

        
        const mecanicos = await prismaClient.mecanico.findMany({
            select: {
                id_mecanico: true,
                nome: true,
                email: true,
                celular: true,
                ativo: true
            }
        });
        return mecanicos;
}   
}
export { ListMecanicoService }