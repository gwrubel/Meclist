import { hash } from "bcryptjs";
import { Cliente } from "../../models/Cliente";
import { IClienteRepository } from "../../interface/IClienteRepository";
interface ClienteRequest {
    nome: string;
    cpf: string;
    endereco: string;
    email: string;
    senha: string;
    celular: string;
}


export class CreateClienteService {
  
    private clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository) {
        this.clienteRepository = clienteRepository;
    }

   
  async execute({ nome, cpf, endereco, email, senha, celular }: ClienteRequest) {
    

    // Verificar se o email já existe
    const emailExiste = await this.clienteRepository.buscarPorEmail(email);
    if (emailExiste) throw new Error("E-mail já cadastrado!");

    // Gerar hash da senha
    const senhaHash = await hash(senha, 8);

    // Criar instância do cliente
    const cliente = new Cliente({ nome, cpf, endereco, celular, email, senha: senhaHash });

    // Salvar no banco
    return await this.clienteRepository.criar(cliente);
  }
}

