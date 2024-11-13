import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from "jsonwebtoken";


interface AuthAdmRequest {
  email: string;
  senha: string;
}

class AuthAdmService {
  async execute({ email, senha }: AuthAdmRequest) {
    const adm = await prismaClient.admin.findFirst({
      where: {
        email: email,
      }
    });

    //verifica se o email existe
    if (!adm) {
      throw new Error("E-mail/senha incorretos");
    }

    //verifica se a senha esta correta
    const senhaEIgual = await compare(senha, adm.senha);

    if (!senhaEIgual) {
      throw new Error("Email/senha incorretos");
    }

    //se deu tudo certo gera o token 
    const token = sign({
      name: adm.nome,
      email: adm.email,
    }, process.env.JWT_SECRET, {
      subject: adm.id_adm.toString(),
      expiresIn: '30d',
    });

    return {
      id: adm.id_adm,
      name: adm.nome,
      email: adm.email,
      token: token
    }
  }
}

export { AuthAdmService };
