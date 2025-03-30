
import { Cliente } from "../../models/Cliente";
import { IClienteRepository } from "../../interface/IClienteRepository";


class EditClienteService {
     private clienteRepository: IClienteRepository;
    
        constructor(clienteRepository: IClienteRepository) {
            this.clienteRepository = clienteRepository;
        }
    async execute(id_cliente: number, dados: any) {
        
        const cliente = new Cliente( dados );

        return  await this.clienteRepository.atualizar(id_cliente, cliente);

       
    }
}

export { EditClienteService };
