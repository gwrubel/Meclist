import prismaClient from "../../prisma";

class ListVeiculosClienteService {
    async execute(id_cliente: number) {
        const veiculos = await prismaClient.veiculo.findMany({
            where: {
                id_cliente: id_cliente
            },
            include: {
                Cliente: {
                    select: {
                        nome: true,
                    }
                }
            }
        })
        return veiculos
    }
}

export { ListVeiculosClienteService } 