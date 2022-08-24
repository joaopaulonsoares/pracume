/*
  Warnings:

  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_orderPadId_fkey";

-- DropTable
DROP TABLE "Orders";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deliveryTime" TIMESTAMP(3),
    "deliveryType" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "amountScale" INTEGER NOT NULL DEFAULT 2,
    "status" "ORDER_PAD_STATUS" NOT NULL DEFAULT 'OPEN',
    "holderName" TEXT NOT NULL,
    "tableReference" TEXT,
    "orderPadId" INTEGER,
    "products" JSONB,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderPadId_fkey" FOREIGN KEY ("orderPadId") REFERENCES "OrderPad"("id") ON DELETE SET NULL ON UPDATE CASCADE;
