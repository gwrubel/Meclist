import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

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
      throw new Error("Email/senha incorretos");
    }

    //verifica se a senha esta correta
    const senhaEIgual = await compare(senha, adm.senha);

    if (!senhaEIgual) {
      throw new Error("Email/senha incorretos");
    }

    return adm.email;
  }
}

export { AuthAdmService };
