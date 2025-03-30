import prismaClient from "../../prisma";

class SeeAllChecklistService {
  async execute() {
    const checklists = await prismaClient.checklist.findMany({
      select: {
        id_checklist: true, // ID do checklist
        descricao: true, // Descrição do checklist
        Status: {
          select: {
            id_status: true, // Status do checklist
          },
        },
        Veiculo: {
          select: {
            placa: true, // Placa do veículo
            Cliente: {
              select: {
                nome: true, // Nome do cliente
              },
            },
          },
        },
      },
    });

    if (!checklists) {
      throw new Error("Nenhum checklist encontrado");
    }

    return checklists;
  }
}

export { SeeAllChecklistService };
