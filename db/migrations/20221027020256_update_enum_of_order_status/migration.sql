/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('OPEN', 'PREPARING', 'READY', 'DELIVERED', 'CANCELED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "ORDER_STATUS" NOT NULL DEFAULT 'PREPARING';
