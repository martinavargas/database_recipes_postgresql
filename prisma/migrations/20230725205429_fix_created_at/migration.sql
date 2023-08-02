/*
  Warnings:

  - You are about to drop the column `quantityId` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the `ingredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_quantity_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe" DROP CONSTRAINT "recipe_quantityId_fkey";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "quantity" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "quantityId",
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "ingredients";

-- CreateTable
CREATE TABLE "ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_quantity_id_fkey" FOREIGN KEY ("quantity_id") REFERENCES "quantity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToRecipe" ADD CONSTRAINT "_IngredientToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
