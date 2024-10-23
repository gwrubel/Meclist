import prismaClient from "../../prisma";

class ListVeiculosClienteService {
    async execute(id_cliente: number) {
        const veiculos = await prismaClient.veiculo.findMany({
            where: {
                id_cliente: id_cliente
            }
        })
        return veiculos
    }
}

export { ListVeiculosClienteService } 