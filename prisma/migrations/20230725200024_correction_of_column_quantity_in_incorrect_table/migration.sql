/*
  Warnings:

  - You are about to drop the column `cookingTime` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `preparationTime` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `quantity_id` on the `recipe` table. All the data in the column will be lost.
  - Added the required column `quantity_id` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cooking_time` to the `recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preparation_time` to the `recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recipe" DROP CONSTRAINT "recipe_quantity_id_fkey";

-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "quantity_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "cookingTime",
DROP COLUMN "preparationTime",
DROP COLUMN "quantity_id",
ADD COLUMN     "cooking_time" INTEGER NOT NULL,
ADD COLUMN     "preparation_time" INTEGER NOT NULL,
ADD COLUMN     "quantityId" INTEGER;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_quantityId_fkey" FOREIGN KEY ("quantityId") REFERENCES "quantity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_quantity_id_fkey" FOREIGN KEY ("quantity_id") REFERENCES "quantity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
