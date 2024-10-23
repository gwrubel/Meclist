import prismaClient from "../../prisma/index";
import { hash } from "bcryptjs";


interface AdmRequest {
    nome: string;
    email: string;
    senha: string;
}

class CreateAdmService {
    async execute({ nome, email, senha }: AdmRequest) {
        //verificar se o email existe
        if (!email) {
            throw new Error("Email invalido");
        }
        
        const admExiste = await prismaClient.admin.findFirst({
            where: {
                email: email
            }
        });
        if (admExiste) {
            throw new Error("Email ja cadastrado");
        }

        const passwordHash = await hash(senha, 8);

        const adm = await prismaClient.admin.create({
            data: {
                nome: nome,                 
                email: email,
                senha: passwordHash
            },
            select: {
                id_adm: true,
                nome: true,
                email: true
            }
        });

        return adm;
    }}
export { CreateAdmService }