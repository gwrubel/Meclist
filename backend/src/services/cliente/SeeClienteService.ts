import { IClienteRepository } from "../../interface/IClienteRepository";

class SeeClienteService {
  private clienteRepository: IClienteRepository;
  constructor(clienteRepository: IClienteRepository) {
    this.clienteRepository = clienteRepository;
}

  async execute(id_cliente:number) {

    const cliente = await this.clienteRepository.buscarPorId(id_cliente);
    if (!cliente) {
      throw new Error("Cliente não encontrado!");
    }
    return  cliente;

  }
}

export { SeeClienteService };