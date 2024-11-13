import prismaClient from "../../prisma";
import validator from "validator";

class EditMecanicoService {
  async execute(id_mecanico: number, dados: any) {
    //logica para verificar se os dados vieram na requisição
    if (!dados.nome || !dados.email || !dados.celular || !("ativo" in dados)) {
      throw new Error("Dados inválidos");
    }

    if (!validator.isEmail(dados.email)) {
      throw new Error("E-mail inválido");
    }

    //verificar se o celular é valido
    if (!validator.isMobilePhone(dados.celular, ["pt-BR"])) {
      throw new Error("Celular inválido");
    }

    const mecanicoAtualizado = await prismaClient.mecanico.update({
      where: {
        id_mecanico: id_mecanico,
      },
      data: {
        nome: dados.nome,
        email: dados.email,
        celular: dados.celular,
        ativo: dados.ativo,
        updated_at: new Date(),
      },
      select: {
        id_mecanico: true,
        nome: true,
        email: true,
        celular: true,
        ativo: true,
      },
    });

    //verifica se existe o mecanico
    if (!mecanicoAtualizado) {
      throw new Error("Mecânico não encontrado");
    }

    return mecanicoAtualizado;
  }
}

export { EditMecanicoService };
