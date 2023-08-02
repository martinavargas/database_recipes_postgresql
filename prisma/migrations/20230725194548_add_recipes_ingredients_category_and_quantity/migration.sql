/*
  Warnings:

  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `responsibles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "loans" DROP CONSTRAINT "loans_book_id_fkey";

-- DropForeignKey
ALTER TABLE "loans" DROP CONSTRAINT "loans_responsible_id_fkey";

-- DropForeignKey
ALTER TABLE "loans" DROP CONSTRAINT "loans_user_id_fkey";

-- DropTable
DROP TABLE "books";

-- DropTable
DROP TABLE "loans";

-- DropTable
DROP TABLE "responsibles";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "preparationTime" INTEGER NOT NULL,
    "cookingTime" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "quantity_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quantity" (
    "id" SERIAL NOT NULL,
    "grams" INTEGER NOT NULL,
    "cup" INTEGER NOT NULL,
    "spoon" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "quantity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IngredientToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToRecipe_AB_unique" ON "_IngredientToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToRecipe_B_index" ON "_IngredientToRecipe"("B");

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_quantity_id_fkey" FOREIGN KEY ("quantity_id") REFERENCES "quantity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToRecipe" ADD CONSTRAINT "_IngredientToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToRecipe" ADD CONSTRAINT "_IngredientToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
