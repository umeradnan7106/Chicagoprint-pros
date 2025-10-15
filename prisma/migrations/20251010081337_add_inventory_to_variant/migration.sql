/*
  Warnings:

  - You are about to alter the column `basePrice` on the `CustomProduct` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `price` on the `CustomVariant` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopifyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "basePrice" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_CustomProduct" ("basePrice", "createdAt", "id", "image", "shopifyId", "title", "updatedAt") SELECT "basePrice", "createdAt", "id", "image", "shopifyId", "title", "updatedAt" FROM "CustomProduct";
DROP TABLE "CustomProduct";
ALTER TABLE "new_CustomProduct" RENAME TO "CustomProduct";
CREATE UNIQUE INDEX "CustomProduct_shopifyId_key" ON "CustomProduct"("shopifyId");
CREATE TABLE "new_CustomVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "inventory" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "CustomVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CustomProduct" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CustomVariant" ("id", "inventory", "price", "productId", "title") SELECT "id", "inventory", "price", "productId", "title" FROM "CustomVariant";
DROP TABLE "CustomVariant";
ALTER TABLE "new_CustomVariant" RENAME TO "CustomVariant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
