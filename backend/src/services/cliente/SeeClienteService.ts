import prismaClient from "../../prisma";

class SeeClienteService {
  async execute(id_cliente:number) {

    const cliente = await prismaClient.cliente.findFirst({
        where: {
            id_cliente: id_cliente
        },select:{
            nome: true,
            cpf: true,
            endereco: true, 
            email: true,
            celular: true,
            ativo: true,
        }
    })

    if (!cliente) {
      throw new Error("Cliente não encontrado!");
    }
    return  cliente;

  }
}

export { SeeClienteService };