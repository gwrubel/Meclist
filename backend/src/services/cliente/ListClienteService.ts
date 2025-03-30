
import { IClienteRepository } from "../../interface/IClienteRepository";

class ListClienteService {
     private clienteRepository: IClienteRepository;
    
        constructor(clienteRepository: IClienteRepository) {
            this.clienteRepository = clienteRepository;
        }
    
    async execute() {
       return await this.clienteRepository.listarClientes();
}   
}
export { ListClienteService }