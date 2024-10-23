import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import validator from "validator";

interface ClienteRequest {
    nome: string;
    cpf: string;
    endereco: string;
    email: string;
    senha: string;
    celular: string;
}

class CreateClienteService {
    async execute({nome,cpf,endereco,email,senha,celular}: ClienteRequest) {
        if (!nome || !cpf || !endereco || !email || !senha) {
            throw new Error("todos os campos são obrigatorios");
        }

        //verificar se o email é valido
        if (!validator.isEmail(email)) {
            throw new Error("email inválido");
        }

        //verificar se o celular é valido
        if (!validator.isMobilePhone(celular, ["pt-BR"])) {
            throw new Error("celular inválido");
        }

        //verifica se o email ja existe
        const emailExiste = await prismaClient.cliente.findFirst({
            where: {
                email: email,
            },
        });

        if (emailExiste) {
            throw new Error("email ja cadastrado");
        }

        const passwordHas = await hash(senha,8);

        const cliente = await  prismaClient.cliente.create({
            data: {
                nome: nome,
                cpf: cpf,
                endereco: endereco,
                celular: celular,
                senha:passwordHas,
                email: email
            },
            select:{
                id_cliente: true,
                nome: true,
                email: true,
                celular: true,
                endereco: true,
                ativo: true 
            }
        });

        return cliente;
    }
}

export { CreateClienteService };
