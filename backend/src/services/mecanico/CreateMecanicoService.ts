import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import validator from "validator";

interface MecanicoRequest {
    nome: string;
    email: string;
    celular: string;
    senha: string;
}

class CreateMecanicoService {
    async execute({ nome, email, celular, senha }: MecanicoRequest) {
        if(!nome || !email || !celular || !senha) {
            throw new Error("todos os campos são obrigatórios");
            
        }


        //verificar se o email é valido
        if(!validator.isEmail(email)) {
            throw new Error("email inválido");
        }

        //verificar se o celular é valido
        if(!validator.isMobilePhone(celular, ["pt-BR"])) {
            throw new Error("celular inválido");
        }

        //verificar se o email existe
        const mecanicoExiste = await prismaClient.mecanico.findFirst({
            where: {
                email: email
            }
        })

        if(mecanicoExiste) {    
            throw new Error("email ja cadastrado");
        }

        const passwordHas = await hash(senha,8);

        const mecanico = await prismaClient.mecanico.create({
            data: {
                nome: nome,
                email: email,
                celular: celular,
                senha: passwordHas
            },
            select: {
                id_mecanico: true,
                nome: true,
                email: true
            }
        });
        return mecanico;
    }
}

export { CreateMecanicoService }