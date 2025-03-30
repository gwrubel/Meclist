import { Cliente } from "../models/Cliente";

export interface IClienteRepository {
    criar(cliente: Cliente): Promise<any>;
    buscarPorEmail(email: string): Promise<any>;
    atualizar(id_cliente: number, cliente: Cliente): Promise<any>;
    listarClientes(): Promise<any>;
    buscarPorId(id_cliente: number): Promise<any>;
}