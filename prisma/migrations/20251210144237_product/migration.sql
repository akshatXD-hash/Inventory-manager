-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "lowStockAt" INTEGER;

-- CreateIndex
CREATE INDEX "Product_userId_name_idx" ON "Product"("userId", "name");

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "Product"("createdAt");
