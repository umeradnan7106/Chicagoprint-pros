/*
  Warnings:

  - A unique constraint covering the columns `[shopifyId]` on the table `CustomProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomProduct_shopifyId_key" ON "CustomProduct"("shopifyId");
