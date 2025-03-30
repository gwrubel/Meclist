import prismaClient from "../../prisma";

interface DeleteVeiculoRequest {
    id_cliente: number;
    id_veiculo: number;
}

class DeleteVeiculoService {
    async execute({ id_cliente, id_veiculo }: DeleteVeiculoRequest) {

        console.log("id_cliente", id_cliente);
        console.log("id_veiculo", id_veiculo);
        // Verificar se o veículo pertence ao cliente
        const veiculoExiste = await prismaClient.veiculo.findFirst({
            where: {
                id_veiculo: id_veiculo,
                id_cliente: id_cliente,
            },
        });

        if (!veiculoExiste) {
            throw new Error("Veículo não encontrado ou não pertence ao cliente especificado");
        }

        // Deletar o veículo
        const veiculo = await prismaClient.veiculo.delete({
            where: {
                id_veiculo: id_veiculo,
            },
        });

        return veiculo;
    }
}

export { DeleteVeiculoService };
