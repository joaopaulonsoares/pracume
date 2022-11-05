-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cashRegisterId" INTEGER;

-- AlterTable
ALTER TABLE "OrderPad" ADD COLUMN     "cashRegisterId" INTEGER;

-- CreateTable
CREATE TABLE "CashRegister" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3) NOT NULL,
    "isClosed" BOOLEAN NOT NULL,

    CONSTRAINT "CashRegister_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cashRegisterId_fkey" FOREIGN KEY ("cashRegisterId") REFERENCES "CashRegister"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPad" ADD CONSTRAINT "OrderPad_cashRegisterId_fkey" FOREIGN KEY ("cashRegisterId") REFERENCES "CashRegister"("id") ON DELETE SET NULL ON UPDATE CASCADE;
