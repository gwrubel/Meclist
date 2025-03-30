import prismaClient from "../prisma";
import { Cliente } from "../models/Cliente";
import { IClienteRepository } from "../interface/IClienteRepository";


export class ClienteRepository implements IClienteRepository {
  async criar(cliente: Cliente) {
    return await prismaClient.cliente.create({
      data: {
        nome: cliente.getNome(),
        cpf: cliente.getCpf(),
        endereco: cliente.getEndereco(),
        celular: cliente.getCelular(),
        email: cliente.getEmail(),
        senha: cliente.getSenha(),
        ativo: cliente.isAtivo(),
      },
      select: {
        id_cliente: true,
        nome: true,
        email: true,
        celular: true,
        endereco: true,
        ativo: true,
      },
    });
  }

  async buscarPorEmail(email: string) {
    return await prismaClient.cliente.findFirst({
      where: { email },
    });
  }

  async atualizar(id_cliente: number, cliente: Cliente) {
    return await prismaClient.cliente.update({
      where: { id_cliente },
      data: {
        nome: cliente.getNome(),
        cpf: cliente.getCpf(),
        endereco: cliente.getEndereco(),
        celular: cliente.getCelular(),
        email: cliente.getEmail(),
        ativo: cliente.isAtivo(),
        updated_at: new Date(),
      },
      select: {
        id_cliente: true,
        nome: true,
        email: true,
        celular: true,
        endereco: true,
        ativo: true,
      },
    });
  }

  async listarClientes() {
    const clientes = await prismaClient.cliente.findMany({
      select: {
        id_cliente: true,
        nome: true,
        email: true,
        celular: true,
        endereco: true,
        ativo: true,
        _count: {
          select: {
            veiculos: true,
          },
        },
      },
    });
    return clientes;
  }

  async buscarPorId(id_cliente: number) {
    return await prismaClient.cliente.findUnique({
      where: { id_cliente },
      select: {
        id_cliente: true,
        nome: true,
        email: true,
        celular: true,
        endereco: true,
        ativo: true,
        veiculos: true,
        _count: {
          select: {
            veiculos: true,
            
          },
        },
      },
    });
  }

  
}
