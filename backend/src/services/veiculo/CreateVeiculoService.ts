import prismaClient from "../../prisma";

interface VeiculoRequest{
    id_cliente: number;
    placa: string
    marca: string;
    modelo: string;
    ano: number;
    cor: string;
    quilometragem: number;
}

class CreateVeiculoService{
    async execute({ id_cliente, placa, marca, modelo, ano, cor, quilometragem }: VeiculoRequest){


        const cliente = await prismaClient.cliente.findUnique({
            where: {
                id_cliente: id_cliente
            }
        })

        if(!cliente){
            throw new Error("Cliente inválido")
        }

        const veiculoExiste = await prismaClient.veiculo.findFirst({
            where: {
                placa: placa
            }
        })

        if(veiculoExiste){
            throw new Error("Veiculo ja cadastrado")
        }

        const veiculo = await prismaClient.veiculo.create({
            data: {
                placa: placa,
                marca: marca,
                modelo: modelo,
                ano: ano,
                cor: cor,
                quilometragem: quilometragem,
                Cliente:{
                    connect: {
                        id_cliente: id_cliente
                    }
                }
            },
            select: {
                id_veiculo: true,
                placa: true,
                marca: true,
                modelo: true,
                ano: true,
                cor: true,
                quilometragem: true,
                id_cliente: true
            }
        })
        return veiculo;
    }



}

export { CreateVeiculoService }