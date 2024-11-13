import prismaClient from "../../prisma";


class ListClienteService {

    async execute() {

        const clientes = await prismaClient.cliente.findMany({
            select: {
                id_cliente: true,
                nome: true,
                email: true,
                celular: true,
                endereco: true,
                ativo: true,
                 _count:{
                    select: {
                        veiculos: true,
                    }
                 }
            }

            
        });
        
        return clientes;
}   
}
export { ListClienteService }