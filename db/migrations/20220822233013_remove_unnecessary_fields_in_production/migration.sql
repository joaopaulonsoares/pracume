/*
  Warnings:

  - You are about to drop the column `productId` on the `Additional` table. All the data in the column will be lost.
  - You are about to drop the column `saleId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sandwichesId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_BeverageToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Additional" DROP CONSTRAINT "Additional_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_saleId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sandwichesId_fkey";

-- DropForeignKey
ALTER TABLE "_BeverageToProduct" DROP CONSTRAINT "_BeverageToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_BeverageToProduct" DROP CONSTRAINT "_BeverageToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Additional" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "saleId",
DROP COLUMN "sandwichesId",
ADD COLUMN     "description" TEXT;

-- DropTable
DROP TABLE "_BeverageToProduct";
