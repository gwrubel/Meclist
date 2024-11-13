import prismaClient from "../../prisma";

class DeleteMecanicoService {
    async execute(id_mecanico: number) {
        const mecanicoExiste = await prismaClient.mecanico.findFirst({
            where: {
                id_mecanico: id_mecanico
            }
        })

        if (!mecanicoExiste) {
            throw new Error("Mecânico não existe");
        }


        const mecanico = await prismaClient.mecanico.delete({
            where: {
                id_mecanico: id_mecanico,
            },
        });
        return mecanico;
    }
}

export { DeleteMecanicoService };