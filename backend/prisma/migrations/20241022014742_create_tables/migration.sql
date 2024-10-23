-- CreateTable
CREATE TABLE "admins" (
    "id_adm" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id_adm")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id_cliente" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "endereco" TEXT NOT NULL,
    "celular" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "veiculos" (
    "id_veiculo" SERIAL NOT NULL,
    "placa" VARCHAR(7) NOT NULL,
    "marca" VARCHAR(50) NOT NULL,
    "modelo" VARCHAR(50) NOT NULL,
    "ano" INTEGER NOT NULL,
    "cor" VARCHAR(20) NOT NULL,
    "quilometragem" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_cliente" INTEGER NOT NULL,

    CONSTRAINT "veiculos_pkey" PRIMARY KEY ("id_veiculo")
);

-- CreateTable
CREATE TABLE "checklists" (
    "id_checklist" SERIAL NOT NULL,
    "id_veiculo" INTEGER NOT NULL,
    "id_status" INTEGER NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checklists_pkey" PRIMARY KEY ("id_checklist")
);

-- CreateTable
CREATE TABLE "orcamentos" (
    "id_orcamento" SERIAL NOT NULL,
    "id_checklist" INTEGER NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "aprovado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orcamentos_pkey" PRIMARY KEY ("id_orcamento")
);

-- CreateTable
CREATE TABLE "Item_checklist" (
    "id_checklist" SERIAL NOT NULL,
    "id_item" INTEGER NOT NULL,
    "autorizado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_checklist_pkey" PRIMARY KEY ("id_checklist")
);

-- CreateTable
CREATE TABLE "itens" (
    "id_item" SERIAL NOT NULL,
    "nome_item" VARCHAR(100) NOT NULL,
    "id_status_item" INTEGER NOT NULL,
    "foto_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itens_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id_produto" SERIAL NOT NULL,
    "id_item" INTEGER NOT NULL,
    "nome_produto" VARCHAR(15) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor_uni" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable
CREATE TABLE "status_itens" (
    "id_status_item" SERIAL NOT NULL,
    "descricao" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "status_itens_pkey" PRIMARY KEY ("id_status_item")
);

-- CreateTable
CREATE TABLE "servicos" (
    "id_servico" SERIAL NOT NULL,
    "id_checklist" INTEGER NOT NULL,
    "id_mecanico" INTEGER NOT NULL,
    "data_realizacao" TIMESTAMP(3) NOT NULL,
    "id_status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicos_pkey" PRIMARY KEY ("id_servico")
);

-- CreateTable
CREATE TABLE "status" (
    "id_status" SERIAL NOT NULL,
    "descricao" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id_status")
);

-- CreateTable
CREATE TABLE "mecanicos" (
    "id_mecanico" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "celular" VARCHAR(20) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mecanicos_pkey" PRIMARY KEY ("id_mecanico")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orcamentos_id_checklist_key" ON "orcamentos"("id_checklist");

-- CreateIndex
CREATE UNIQUE INDEX "mecanicos_email_key" ON "mecanicos"("email");

-- AddForeignKey
ALTER TABLE "veiculos" ADD CONSTRAINT "veiculos_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklists" ADD CONSTRAINT "checklists_id_veiculo_fkey" FOREIGN KEY ("id_veiculo") REFERENCES "veiculos"("id_veiculo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklists" ADD CONSTRAINT "checklists_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status"("id_status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orcamentos" ADD CONSTRAINT "orcamentos_id_checklist_fkey" FOREIGN KEY ("id_checklist") REFERENCES "checklists"("id_checklist") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_checklist" ADD CONSTRAINT "Item_checklist_id_checklist_fkey" FOREIGN KEY ("id_checklist") REFERENCES "checklists"("id_checklist") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_checklist" ADD CONSTRAINT "Item_checklist_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "itens"("id_item") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_id_status_item_fkey" FOREIGN KEY ("id_status_item") REFERENCES "status_itens"("id_status_item") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "itens"("id_item") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos" ADD CONSTRAINT "servicos_id_checklist_fkey" FOREIGN KEY ("id_checklist") REFERENCES "checklists"("id_checklist") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos" ADD CONSTRAINT "servicos_id_mecanico_fkey" FOREIGN KEY ("id_mecanico") REFERENCES "mecanicos"("id_mecanico") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos" ADD CONSTRAINT "servicos_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status"("id_status") ON DELETE RESTRICT ON UPDATE CASCADE;
