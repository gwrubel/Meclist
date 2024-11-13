import prismaClient from "../../prisma";
import validator from "validator";
import { validarCPF } from "../../utils/ValidatorCPF";


class EditClienteService {
    async execute(id_cliente: number, dados: any) {
        
        if (!dados.nome || !dados.cpf || !dados.endereco || !dados.email || !dados.celular || !("ativo" in dados)) {
            throw new Error("Dados inválidos");
        }

        // Verificação do CPF
        if (!validarCPF(dados.cpf)) {
            throw new Error("CPF inválido");
        }

        // Verificar se o e-mail é válido
        if (!validator.isEmail(dados.email)) {
            throw new Error("E-mail inválido");
        }

        // Verificar se o celular é válido
        if (!validator.isMobilePhone(dados.celular, ["pt-BR"])) {
            throw new Error("Celular inválido");
        }

        // Atualiza o cliente no banco de dados
        const clienteAtualizado = await prismaClient.cliente.update({
            where: {
                id_cliente: id_cliente,
            },
            data: {
                nome: dados.nome,
                cpf: dados.cpf,
                endereco: dados.endereco,
                email: dados.email,
                celular: dados.celular,
                ativo: dados.ativo,
                updated_at: new Date(),
            },
            select: {
                id_cliente: true,
                nome: true,
            },
        });

        if (!clienteAtualizado) {
            throw new Error("Cliente não encontrado");
        }

        return clienteAtualizado;
    }
}

export { EditClienteService };
