import prismaClient from "../../prisma";

class SeeMecanicoService {
  async execute(id_mecanico:number) {

    const mecanico = await prismaClient.mecanico.findFirst({
        where: {
            id_mecanico: id_mecanico
        },select:{
            nome: true, 
            email: true,
            celular: true,
            ativo: true,
        }
    })

    if (!mecanico) {
      throw new Error("Mecânico não encontrado!");
    }
    return  mecanico;

  }
}

export { SeeMecanicoService };