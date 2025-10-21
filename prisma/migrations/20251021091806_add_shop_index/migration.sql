/*
  Warnings:

  - You are about to alter the column `shop` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "shop" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE INDEX "Session_shop_idx" ON "Session"("shop");
