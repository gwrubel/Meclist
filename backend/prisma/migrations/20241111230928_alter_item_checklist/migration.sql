/*
  Warnings:

  - The primary key for the `Item_checklist` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Item_checklist" DROP CONSTRAINT "Item_checklist_pkey",
ADD COLUMN     "id_item_checklist" SERIAL NOT NULL,
ALTER COLUMN "id_checklist" DROP DEFAULT,
ADD CONSTRAINT "Item_checklist_pkey" PRIMARY KEY ("id_item_checklist");
DROP SEQUENCE "Item_checklist_id_checklist_seq";

-- AlterTable
ALTER TABLE "produtos" ALTER COLUMN "nome_produto" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "status" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(100);
